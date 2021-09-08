defmodule Vtm.Repo.Migrations.AddPredatorTypeToCharacter do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :generation, :integer, default: 13
      add :predator_type_id, references(:predator_types, on_delete: :nothing)
    end
    
    create index(:characters, [:predator_type_id])
  end
end
