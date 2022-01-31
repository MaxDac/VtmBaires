defmodule Vtm.Repo.Migrations.AddHuntCharacteristics do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :hunt_difficulty, :integer, default: 2
    end

    alter table(:predator_types) do
      add :attribute_id, references(:attributes, on_delete: :nilify_all)
      add :skill_id, references(:attributes, on_delete: :nilify_all)
    end
  end
end
