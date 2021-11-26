defmodule Vtm.Repo.Migrations.CreateExperienceLogs do
  use Ecto.Migration

  def change do
    create table(:experience_logs) do
      add :change, :integer
      add :character_id, references(:characters, on_delete: :nothing)
      add :attribute_id, references(:attributes, on_delete: :nothing)
      add :master_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:experience_logs, [:character_id])
    create index(:experience_logs, [:attribute_id])
    create index(:experience_logs, [:master_id])
  end
end
