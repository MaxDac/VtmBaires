defmodule Vtm.Repo.Migrations.AddSelectableClan do
  use Ecto.Migration

  def change do
    alter table(:clans) do
      add :selectable, :boolean, default: true
    end
  end
end
