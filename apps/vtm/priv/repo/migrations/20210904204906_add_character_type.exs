defmodule Vtm.Repo.Migrations.AddCharacterType do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :is_npc, :boolean, default: false
      add :is_complete, :boolean, default: false
      add :experience, :integer, default: 0
    end
  end
end
