defmodule Vtm.Repo.Migrations.AddStainsToCharacter do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :stains, :integer, default: 0
    end
  end
end
