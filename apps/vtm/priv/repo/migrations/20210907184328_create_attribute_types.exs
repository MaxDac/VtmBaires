defmodule Vtm.Repo.Migrations.CreateAttributeTypes do
  use Ecto.Migration

  def change do
    create table(:attribute_types) do
      add :name, :string
      add :section, :string

      timestamps()
    end

  end
end
