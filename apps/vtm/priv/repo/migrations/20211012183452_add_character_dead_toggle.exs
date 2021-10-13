defmodule Vtm.Repo.Migrations.AddCharacterDeadToggle do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :torpor, :boolean, default: false
      add :dead, :boolean, default: false
    end
  end
end
