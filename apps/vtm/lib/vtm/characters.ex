defmodule Vtm.Characters do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.InfoRegistry
  alias Vtm.Characters.Character
  alias Vtm.Characters.Clan
  alias Vtm.Characters.PredatorType
  alias Vtm.Characters.Attribute
  alias Vtm.Characters.CharacterAttribute
  alias Vtm.Characters.AttributeType

  @spec all() :: [%Character{}]
  def all() do
    query =
      from c in Character,
        select: {c.id, c.name}

    Repo.all(query)
    |> Enum.map(fn {id, name} -> %Character{id: id, name: name} end)
  end

  def all_unapproved() do
    query =
      from c in Character,
        where: c.is_complete == true,
        where: c.approved == false,
        select: {c.id, c.name}

    Repo.all(query)
    |> Enum.map(fn {id, name} -> %Character{id: id, name: name} end)
  end

  def get_clans() do
    Clan |> Repo.all()
  end

  def get_clan_disciplines(clan_id) do
    %{attributes: attributes} = Clan
    |> preload(:attributes)
    |> Repo.get(clan_id)

    attributes
  end

  defp fetch_attributes() do
    query =
      from a in Attribute,
        join: at in AttributeType,
        on: a.attribute_type_id == at.id,
        select: %{a | attribute_type: at}

    Repo.all(query)
  end

  def get_attributes() do
    InfoRegistry.get_or_refetch(:attributes, &fetch_attributes/0)
  end

  def get_predator_types() do
    PredatorType |> Repo.all()
  end

  defp select_user_characters_info(query) do
    from character in query,
      select: %Character{
        id: character.id,
        name: character.name,
        chat_avatar: character.chat_avatar,
        is_npc: character.is_npc,
        is_complete: character.is_complete,
        stage: character.stage,
        approved: character.approved,
      }
  end

  def get_user_characters(%{role: :master, id: id}) do
    query = from c in Character,
      where: c.is_npc,
      or_where: c.user_id == ^id

    query
    |> select_user_characters_info()
    |> Repo.all()
  end

  def get_user_characters(%{id: id}) do
    query = from c in Character, where: c.user_id == ^id

    query
    |> select_user_characters_info()
    |> Repo.all()
  end

  def get_character_user(%{id: id}) do
    character =
      Character
      |> preload(:user)
      |> Repo.get(id)

    case character do
      %{user: user} -> user
      _             -> nil
    end
  end

  def character_of_user?(user_id, character_id) do
    query = from c in Character,
      where: c.id == ^character_id,
      where: c.user_id == ^user_id

    not is_nil(Repo.one(query))
  end

  def character_at_stage?(character_id, stage) do
    query = from c in Character,
      where: c.id == ^character_id,
      where: c.stage == ^stage

    not is_nil(Repo.one(query))
  end

  def get_specific_character(%{role: :master}, id) do
    Character
    |> preload(:clan)
    |> preload(:predator_type)
    |> Repo.get(id)
  end

  def get_specific_character(%{id: user_id}, id) do
    query =
      from c in Character,
        where: c.id == ^id,
        where: c.user_id == ^user_id

    Repo.one(query)
    |> Repo.preload(:clan)
    |> Repo.preload(:predator_type)
  end

  def get_specific_character(_, _) do
    nil
  end

  def get_character_status(user_id, character_id) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        where: c.user_id == ^user_id,
        select: %{
          id: c.id,
          experience: c.experience,
          humanity: c.humanity,
          generation: c.generation,
          hunger: c.hunger,
          health: c.health,
          damage: c.damage,
          aggravated_damage: c.aggravated_damage,
          willpower: c.willpower,
          willpower_damage: c.willpower_damage
        }

    Repo.one(query)
  end

  defp associate_attribute_to_value(attribute = %Attribute{id: attribute_id}, map) do
    %{
      id: attribute_id,
      value: map |> Map.get(attribute_id, 0),
      attribute: attribute
    }
  end

  defp filter_attributes(%Attribute{attribute_type: %{name: "Attribute"}}, _), do: true
  defp filter_attributes(%Attribute{attribute_type: %{name: "Ability"}}, _), do: true
  defp filter_attributes(%Attribute{id: id}, map), do: map |> Map.has_key?(id)
  defp filter_attributes(_, _), do: false

  @spec get_character_attrs_with_value(String.t()) :: %{String.t() => Integer.t()}
  def get_character_attrs_with_value(id) do
    query =
      from ca in CharacterAttribute,
        where: ca.character_id == ^id,
        select: {ca.attribute_id, ca.value}

    query
    |> Repo.all()
    |> Map.new(&(&1))
  end

  def get_character_attributes(id) do
    character_attributes = get_character_attrs_with_value(id)

    get_attributes()
    |> Enum.filter(&filter_attributes(&1, character_attributes))
    |> Enum.map(&associate_attribute_to_value(&1, character_attributes))
  end

  def get_character_predator_type(id) do
    query =
      from c in Character,
        join: p in PredatorType,
        on: c.predator_type_id == p.id,
        where: c.id == ^id,
        select: p

    Repo.one(query)
  end

  defp is_attribute(%{attribute: %{attribute_type: %{name: "Discipline"}}}), do: false
  defp is_attribute(_), do: true

  defp unzip(arr, condition, first \\ [], second \\ [])
  defp unzip([], _, first, second), do: {first, second}
  defp unzip([a | rest], condition, first, second) do
    case condition.(a) do
      true -> unzip(rest, condition, [a | first], second)
      _    -> unzip(rest, condition, first, [a | second])
    end
  end

  def get_character_stats(id) do
    with attributes                                   <- get_character_attributes(id),
         predator_type when not is_nil(predator_type) <- get_character_predator_type(id),
         {attrs, disciplines}                         <- attributes |> unzip(&is_attribute/1) do
      %{
        id: id,
        predator_type: predator_type,
        attributes: attrs |> Enum.reverse(),
        disciplines: disciplines |> Enum.reverse()
      }
    else
      _ ->
        %{
          id: id,
          predator_type: %{},
          attributes: [],
          disciplines: []
        }
    end
  end

  def get_character_name_by_id(character_id) do
    with %{name: name} when not is_nil(name)  <- Character |> Repo.get(character_id) do
      name
    end
  end

  def create(attrs, %{role: :master}) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert()
  end

  def create(attrs, user = %{id: _}) do
    # Checking whether the user already has a character
    case get_user_characters(user) |> Enum.count() do
      0 ->
        %Character{}
        |> Character.changeset(attrs)
        |> Repo.insert()
      _ ->
        {:error, "The user has already a character."}
    end
  end

  def update_character(id, attrs) do
    with character <- Character |> Repo.get(id) do
      character
      |> Character.update_changeset(attrs)
      |> Repo.update()
    end
  end

  @doc """
  This function is in this context, because this context has knowledge of the auth,
  but not vice versa.
  """
  def update_character_in_session(user, %Character{id: id, name: name, approved: approved}) do
    VtmAuth.Accounts.update_session_dynamic_field(user, %{
      character_id: id,
      character_name: name,
      approved: approved
    })
  end

  def update_character_in_session(_, _) do
    {:ok, nil}
  end

  defp invalid_changeset(%Ecto.Changeset{valid?: false}), do: true
  defp invalid_changeset(_), do: false

  defp insertion_error({:error, _}), do: true
  defp insertion_error(_), do: false

  defp delete_attributes(character_id, type) do
    query =
      from ca in CharacterAttribute,
        join: a in Attribute,
        on: ca.attribute_id == a.id,
        join: t in AttributeType,
        on: a.attribute_type_id == t.id,
        where: ca.character_id == ^character_id,
        where: t.name == ^type

    Repo.delete_all(query)
  end

  def append_attributes(character_id, attrs, new_stage) do
    # Cleaning
    case new_stage do
      2 -> delete_attributes(character_id, "Attribute")
      3 -> delete_attributes(character_id, "Ability")
      _ -> %{}
    end

    values = attrs |> Enum.map(&CharacterAttribute.changeset(%CharacterAttribute{}, &1))

    with false <- values |> Enum.any?(&invalid_changeset/1) do
      Repo.transaction(fn ->
        results = values |> Enum.map(&Repo.insert_or_update/1)

        with false <- results |> Enum.any?(&insertion_error/1) do
          {:ok, %{}}
        else
          _ ->
            [error] =
              results
              |> Enum.filter(&insertion_error/1)
              |> Enum.take(1)

            Repo.rollback(error)
        end
      end)
    else
      true ->
        values
        |> Enum.filter(&invalid_changeset/1)
        |> Enum.take(1)
    end
  end

  defp param_to_id(id) when is_binary(id), do: String.to_integer(id)
  defp param_to_id(id), do: id

  defp switch_attribute_value(id_1, id_2, character_attributes) do
    {first = %{value: value_1}, second = %{value: value_2}} = {
      character_attributes |> Enum.find(fn
        %{attribute_id: ^id_1}  -> true
        _                       -> false
      end),
      character_attributes |> Enum.find(fn
        %{attribute_id: ^id_2}  -> true
        _                       -> false
      end)
    }

    [
      {first,  %{value: value_2}},
      {second, %{value: value_1}}
    ]
    |> Enum.map(fn {c, attrs} ->
      c
      |> CharacterAttribute.changeset(attrs)
      |> Repo.update()
    end)
    |> Enum.reduce({:ok, %{}}, fn
      _, acc = {:error, } -> acc
      a, _                -> a
    end)
  end

  defp change_character_attribute(character_attribute, to_id) do
    character_attribute
    |> CharacterAttribute.changeset(%{attribute_id: to_id})
    |> Repo.update()
  end

  def switch_attributes(%{character_id: id, first_attribute: first_id, second_attribute: second_id}) do
    {id_1, id_2} = {
      first_id |> param_to_id(),
      second_id |> param_to_id()
    }

    query =
      from ca in CharacterAttribute,
        where: ca.character_id == ^id,
        where: ca.attribute_id in [^id_1, ^id_2]

    case Repo.all(query) do
      [c = %{attribute_id: ^id_1}]  -> change_character_attribute(c, id_2)
      [c = %{attribute_id: ^id_2}]  -> change_character_attribute(c, id_1)
      attributes                    -> switch_attribute_value(id_1, id_2, attributes)
    end
  end

  # def switch_attributes(request) do
  #   IO.inspect {:error, request}
  # end

  def update_character_stage(user_id, new_stage, attrs) do
    [%{character_id: character_id} | _] = attrs

    with true     <- character_of_user?(user_id, character_id),
         true     <- character_at_stage?(character_id, new_stage - 1),
         {:ok, _} <- append_attributes(character_id, attrs, new_stage),
         {:ok, _} <- update_character(character_id, %{stage: new_stage}) do
      {:ok, character_id}
    else
      false ->
        {:error, :unauthorized}
      e -> e
    end
  end

  def add_advantages(user_id, attrs = %{id: id}) do
    query =
      from c in Character,
        where: c.id == ^id,
        where: c.user_id == ^user_id

    Repo.one(query)
    |> Character.add_advantages_character_changeset(attrs)
    |> Repo.update()
  end

  def complete_character(user_id, character_id) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        where: c.user_id == ^user_id

    Repo.one(query)
    |> Character.finalize_character_changeset(%{is_complete: true})
    |> Repo.update()
  end

  defp delete_character_p(character_id) do
    with c when not is_nil(c) <- Character |> Repo.get(character_id) do
      c |> Repo.delete()
    else
      _ -> {:error, :not_found}
    end
  end

  @spec delete_character(any, %{:id => any, optional(any) => any}) :: {:ok, %{}} | {:error, :unauthorized}
  def delete_character(character_id, user) do
    case user do
      %{role: :master} -> delete_character_p(character_id)
      %{id: user_id}   ->
        if character_of_user?(user_id, character_id) do
          delete_character_p(character_id)
        else
          {:error, :unauthorized}
        end
    end
  end

  def change_sheet_info(character_id, attrs = %{avatar: avatar}) when not is_nil(avatar) do
    Character
    |> Repo.get(character_id)
    |> Character.update_changeset(attrs)
    |> Repo.update()
  end

  def change_sheet_info(character_id, attrs) do
    attrs =
      attrs
      |> Map.drop([:avatar, :chat_avatar])

    Character
    |> Repo.get(character_id)
    |> Character.update_changeset(attrs)
    |> Repo.update()
  end
end
