defmodule Vtm.Repo.Migrations.CreateHavenLocations do
  use Ecto.Migration

  def change do
    create table(:haven_locations) do
      add :x, :integer
      add :y, :integer
      add :difficulty, :integer
      add :owner_difficulty, :integer
      add :danger, :integer
      add :resources_level, :integer
      add :character_id, references(:characters, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:haven_locations, [:x, :y], name: :haven_locations_unique_key)

    create index(:haven_locations, [:character_id])
  end
end
