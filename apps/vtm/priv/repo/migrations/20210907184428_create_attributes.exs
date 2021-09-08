defmodule Vtm.Repo.Migrations.CreateAttributes do
  use Ecto.Migration

  def change do
    create table(:attributes) do
      add :name, :string
      add :description, :string
      add :attribute_type_id, references(:attribute_types, on_delete: :delete_all)

      timestamps()
    end

    create index(:attributes, [:attribute_type_id])
  end
end
