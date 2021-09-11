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
    Repo.all(from c in Character, where: c.user_id == ^id)
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

  def get_specific_character(%{ role: :master }, id) do
    Character
    |> preload(:clan)
    |> preload(:predator_type)
    |> Repo.get(id)
  end

  def get_specific_character(%{ id: user_id }, id) do
    IO.puts "user_id: #{user_id}"
    IO.puts "id: #{id}"

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

  def create(attrs) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert()
  end

  def update_character(id, attrs) do
    with character <- Character |> Repo.get(id) do
      character
      |> Character.update_changeset(attrs)
      |> Repo.update()
    end
  end

  defp invalid_changeset(%Ecto.Changeset{valid?: false}), do: true
  defp invalid_changeset(_), do: false

  defp insertion_error({:error, _}), do: true
  defp insertion_error(_), do: false

  def append_attributes(attrs) do
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

  def update_character_stage(user_id, new_stage, attrs) do
    [%{character_id: character_id} | _] = attrs

    with true     <- character_of_user?(user_id, character_id),
         true     <- character_at_stage?(character_id, new_stage - 1),
         {:ok, _} <- append_attributes(attrs),
         {:ok, _} <- update_character(character_id, %{ stage: new_stage }) do
      {:ok, character_id}
    else
      false ->
        {:error, :unauthorized}
      e -> e
    end
  end
end
