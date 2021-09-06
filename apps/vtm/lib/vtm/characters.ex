defmodule Vtm.Characters do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Characters.Character
  alias Vtm.Characters.Clan

  def get_clans() do
    Clan |> Repo.all()
  end

  def get_user_character(%{role: :master, id: id}) do
    query = from c in Character,
      where: c.is_npc,
      or_where: c.user_id == ^id

    query |> Repo.all()
  end

  def get_user_character(%{id: id}) do
    IO.puts id
    Character |> Repo.get_by(:user_id, id)
  end

  def create(attrs) do
    %Character{}
    |> Character.changeset(attrs)
    |> Repo.insert()
  end

  def update(id, attrs) do
    with character <- Character |> Repo.get(id) do
      character
      |> Character.changeset(attrs)
      |> Repo.update()
    end
  end
end
