defmodule Vtm.Repo.Migrations.CreateCharactersInfo do
  use Ecto.Migration

  def change do
    create table(:characters_info) do
      add :is_vegan, :boolean, default: false, null: false
      add :can_hunt_animals, :boolean, default: false, null: false
      add :character_id, references(:characters, on_delete: :delete_all)

      timestamps()
    end

    create index(:characters_info, [:character_id])
  end
end
