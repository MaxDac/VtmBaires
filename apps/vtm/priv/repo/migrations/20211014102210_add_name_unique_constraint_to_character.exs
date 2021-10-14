defmodule Vtm.Repo.Migrations.AddNameUniqueConstraintToCharacter do
  use Ecto.Migration

  def change do
    create unique_index(:characters, :name, name: :character_name_unique_key)
  end
end
