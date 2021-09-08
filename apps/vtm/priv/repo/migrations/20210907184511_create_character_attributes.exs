defmodule Vtm.Repo.Migrations.CreateCharacterAttributes do
  use Ecto.Migration

  def change do
    create table(:character_attributes) do
      add :value, :integer
      add :character_id, references(:characters, on_delete: :delete_all)
      add :attribute_id, references(:attributes, on_delete: :delete_all)

      timestamps()
    end

    create index(:character_attributes, [:character_id])
    create index(:character_attributes, [:attribute_id])
  end
end
