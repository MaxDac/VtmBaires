defmodule Vtm.Repo.Migrations.CreatePredatorTypes do
  use Ecto.Migration

  def change do
    create table(:predator_types) do
      add :name, :string
      add :description, :string

      timestamps()
    end

  end
end
