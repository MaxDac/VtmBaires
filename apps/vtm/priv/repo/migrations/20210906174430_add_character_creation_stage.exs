defmodule Vtm.Repo.Migrations.AddCharacterCreationStage do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :stage, :integer, default: 1
      add :approved, :boolean, default: false
    end
  end
end
