defmodule Vtm.Characters do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Helpers
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
        order_by: c.name,
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
      where: c.is_npc == false,
      where: c.user_id == ^id

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

  @spec character_of_user?(Integer.t(), Integer.t()) :: boolean
  def character_of_user?(user_id, character_id) do
    query = from c in Character,
      where: c.id == ^character_id,
      where: c.user_id == ^user_id

    not is_nil(Repo.one(query))
  end

  @spec user_has_characters?(String.t()) :: :ok | {:error, String.t()}
  def user_has_characters?(user_id) do
    case Repo.all(from c in Character, where: c.user_id == ^user_id) do
      []  -> :ok
      _   -> {:error, "The user has more than one character"}
    end
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

  @doc """
  Returns a subset of information about the character available to any user.
  """
  @spec get_character_description(Integer.t()) :: Character.t() | nil
  def get_character_description(character_id) do
    from(c in Character, where: c.id == ^character_id, select: %Character{
      id: c.id,
      name: c.name,
      chat_avatar: c.chat_avatar,
      description: c.description
    })
    |> Repo.one()
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

  def get_all_npcs() do
    from(c in Character, where: c.is_npc == true)
    |> Repo.all()
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

  @spec get_character_attributes(Integer.t()) :: list(CharacterAttribute.t())
  def get_character_attributes(id) do
    character_attributes = get_character_attrs_with_value(id)

    get_attributes()
    |> Enum.filter(&filter_attributes(&1, character_attributes))
    |> Enum.map(&associate_attribute_to_value(&1, character_attributes))
  end

  defp handle_character_attribute_query_result(result, character_id) do
    case result do
      {attribute, character_attribute} when not is_nil(character_attribute) ->
        %{character_attribute | attribute: attribute}
      {attribute = %{id: attribute_id}, _} ->
        %CharacterAttribute{
          attribute: attribute,
          attribute_id: attribute_id,
          character_id: character_id,
          value: 0
        }
    end
  end

  @spec get_character_attribute(Integer.t(), String.t()) :: CharacterAttribute.t()
  def get_character_attribute(character_id, attribute_name) do
    # Performance: a direct query is preferred instead of filtering all the character attributes
    query =
      from a in Attribute,
        where: a.name == ^attribute_name,
        left_join: ca in CharacterAttribute,
        on: ca.attribute_id == a.id and ca.character_id == ^character_id,
        select: {a, ca}

    query
    |> Repo.one()
    |> handle_character_attribute_query_result(character_id)
  end

  @spec get_character_attributes_subset(Integer.t(), list(Integer.t())) :: list(CharacterAttribute.t())
  def get_character_attributes_subset(character_id, attribute_names) do
    # Performance: a direct query is preferred instead of filtering all the character attributes
    query =
      from a in Attribute,
        where: a.name in ^attribute_names,
        left_join: ca in CharacterAttribute,
        on: a.id == ca.attribute_id and ca.character_id == ^character_id,
        select: {a, ca}

    query
    |> Repo.all()
    |> Enum.map(&handle_character_attribute_query_result(&1, character_id))
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

  defp get_type(%{attribute: %{attribute_type: %{name: "Discipline"}}}), do: 2
  defp get_type(%{attribute: %{attribute_type: %{name: "Advantage"}}}), do: 3
  defp get_type(_), do: 1

  defp unzip_attributes(arr, condition, attributes \\ [], disciplines \\ [], advantages \\ [])
  defp unzip_attributes([], _, attributes, disciplines, advantages), do: {attributes, disciplines, advantages}
  defp unzip_attributes([a | rest], condition, attributes, disciplines, advantages) do
    case condition.(a) do
      1 -> unzip_attributes(rest, condition, [a | attributes], disciplines, advantages)
      2 -> unzip_attributes(rest, condition, attributes, [a | disciplines], advantages)
      3 -> unzip_attributes(rest, condition, attributes, disciplines, [a | advantages])
    end
  end

  def get_character_stats(id) do
    with attributes                             <- get_character_attributes(id),
         predator_type                          <- get_character_predator_type(id),
         {attributes, disciplines, advantages}  <- attributes |> unzip_attributes(&get_type/1) do
      %{
        id: id,
        predator_type: predator_type,
        attributes: attributes |> Enum.reverse(),
        disciplines: disciplines,
        advantages: advantages
      }
    else
      _ ->
        %{
          id: id,
          predator_type: nil,
          attributes: [],
          disciplines: [],
          advantages: []
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

  def create_npc(attrs, user) do
    with {:ok, character} <- create(attrs, user) do
      character
      |> Character.update_changeset(%{is_npc: true})
      |> Repo.update()
    end
  end

  def add_npc_empty_attributes(character_id) do
    get_attributes()
    |> Enum.filter(fn
      %{attribute_type: %{name: "Attribute"}} -> true
      %{attribute_type: %{name: "Ability"}} -> true
      _  -> false
    end)
    |> Enum.map(fn %{id: id} ->
      %CharacterAttribute{}
      |> CharacterAttribute.changeset(%{attribute_id: id, character_id: character_id, value: 0})
    end)
    |> Enum.map(&Repo.insert/1)
    |> Helpers.reduce_errors({:ok, %Character{id: character_id}})
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

  @doc """
  Inserts or updates the given attributes.
  This function accepts the character_id, and a collection of maps, in the following form:
  %{id: attribute_id, value: attribute_value}
  """
  @spec assign_npc_attributes(Integer.t(), [Map.t()]) :: {:ok, Character.t()} | {:error, any()}
  def assign_npc_attributes(character_id, attributes) do
    existents =
      from(ca in CharacterAttribute, where: ca.character_id == ^character_id)
      |> Repo.all()

    case existents |> Enum.count() do
      #Inserting
      0 ->
        attributes
        |> Enum.map(fn %{id: id, value: value} -> %CharacterAttribute{character_id: character_id, attribute_id: id, value: value} end)
        |> Enum.map(&Repo.insert/1)

      #updating
      _ ->
        attributes_map =
          attributes
          |> Map.new(fn %{id: id, value: value} -> {id, value} end)

        existents
        |> Enum.map(fn ca = %CharacterAttribute{attribute_id: id} ->
          ca
          |> CharacterAttribute.update_changeset(%{value: attributes_map[id]})
        end)
        |> Enum.map(&Repo.update/1)
    end
    |> Helpers.reduce_errors({:ok, %Character{id: character_id}})
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

  def approve_character(character_id) do
    case Character |> Repo.get(character_id) do
      nil       -> {:error, :not_found}
      character ->
        character
        |> Character.changeset(%{approved: true})
        |> Repo.update()
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

  def change_character_attribute(character_id, attribute_id, new_value) do
    [character_id, attribute_id, new_value] |> IO.inspect()
    query =
      from ca in CharacterAttribute,
        where: ca.character_id == ^character_id,
        where: ca.attribute_id == ^attribute_id

    case {Character |> Repo.get(character_id), Repo.one(query), new_value} do
      {nil, _, _} ->
        {:error, :not_found}
      {_, nil, 0} ->
        {:ok, %{}}
      {_, nil, v} ->
        %CharacterAttribute{}
        |> CharacterAttribute.changeset(%{character_id: character_id, attribute_id: attribute_id, value: v})
        |> Repo.insert()
      {_, ca, 0}  ->
        ca
        |> Repo.delete()
      {_, ca, v}  ->
        ca
        |> CharacterAttribute.update_changeset(%{value: v})
        |> Repo.update()
    end
  end

  @spec confirm_png(Integer.t()) :: {:ok, Character.t()}
  def confirm_png(character_id) do
    stamina =
      with %{attributes: ats} <- get_character_stats(character_id),
           [%{value: st} | _] <- ats |> Enum.filter(fn %{attribute: %{name: "Costituzione"}} -> true; _ -> false end) do
        st
      end

    Character
    |> Repo.get(character_id)
    |> Character.update_changeset(%{
      health: stamina + 3,
      hunger: 1,
      is_complete: true,
      approved: true
    })
    |> Repo.update()
  end
end
