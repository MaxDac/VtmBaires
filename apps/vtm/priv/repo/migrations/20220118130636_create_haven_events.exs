defmodule Vtm.Repo.Migrations.CreateHavenEvents do
  use Ecto.Migration

  def change do
    create table(:haven_events) do
      add :danger_triggered, :boolean, default: true, null: false
      add :resolved, :boolean, default: false, null: false
      add :character_id, references(:characters, on_delete: :nothing)
      add :haven_id, references(:haven_locations, on_delete: :nothing)

      timestamps()
    end

    create index(:haven_events, [:character_id])
    create index(:haven_events, [:haven_id])
  end
end
