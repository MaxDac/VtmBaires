defmodule Vtm.Characters do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Characters.Character
  alias Vtm.Characters.Clan
  alias Vtm.Characters.PredatorType
  alias Vtm.Characters.Attribute
  alias Vtm.Characters.CharacterAttribute

  def get_clans() do
    Clan |> Repo.all()
  end

  def get_attributes() do
    Attribute
    |> preload(:attribute_type)
    |> Repo.all()
  end

  def get_predator_types() do
    PredatorType |> Repo.all()
  end

  def get_user_characters(%{role: :master, id: id}) do
    query = from c in Character,
      where: c.is_npc,
      or_where: c.user_id == ^id

    query |> Repo.all()
  end

  def get_user_characters(%{id: id}) do
    Character |> Repo.get_by(:user_id, id)
  end

  def character_of_user?(user_id, character_id) do
    query = from c in Character,
      where: c.id == ^character_id,
      where: c.user_id == ^user_id

    not is_nil(Repo.one(query))
  end

  def get_specific_character(%{ role: :master }, id) do
    Character
    |> preload(:clan)
    |> preload(:predator_type)
    |> Repo.get(id)
  end

  def get_specific_character(%{ id: user_id }, id) do
    query =
      from c in Character,
        where: c.id == ^id,
        where: c.user_id == ^user_id

    Character
    |> preload(:clan)
    |> preload(:predator_type)
    |> Repo.get(query)
  end

  def get_specific_character(_, _) do
    nil
  end

  def create(attrs) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert()
  end

  def update(id, attrs) do
    with character <- Character |> Repo.get(id) do
      character
      |> Character.update_changeset(attrs)
      |> Repo.update()
    end
  end

  def append_attributes(attrs) do
    invalid_changeset = fn
      %Ecto.Changeset{valid?: false} -> true
      _ -> false
    end

    insertion_error = fn
      {:error, _} -> true
      _           -> false
    end

    values = attrs |> Enum.map(&CharacterAttribute.changeset(%CharacterAttribute{}, &1))

    with false    <- values |> Enum.any?(invalid_changeset) do
      IO.puts "css: #{inspect values}"

      Repo.transaction(fn ->
        results = values |> Enum.map(&Repo.insert_or_update/1)

        with false <- results |> Enum.any?(insertion_error) do
          {:ok, %{}}
        else
          _ ->
            [error] =
              results
              |> Enum.filter(insertion_error)
              |> Enum.take(1)

            Repo.rollback(error)
        end
      end)


    else
      true ->
        values
        |> Enum.filter(invalid_changeset)
        |> Enum.take(1)
    end
  end
end
