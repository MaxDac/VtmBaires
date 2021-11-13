defmodule Vtm.Repo.Migrations.AddDisciplineAndObjectsSelectionForCharacter do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :discipline_powers, :text
      add :objects, :text
    end
  end
end
