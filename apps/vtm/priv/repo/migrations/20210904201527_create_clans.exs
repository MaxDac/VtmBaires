defmodule Vtm.Repo.Migrations.CreateClans do
  use Ecto.Migration

  def change do
    create table(:clans) do
      add :name, :string

      timestamps()
    end

  end
end
