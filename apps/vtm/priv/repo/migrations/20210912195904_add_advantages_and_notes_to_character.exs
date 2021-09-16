defmodule Vtm.Repo.Migrations.AddAdvantagesAndNotesToCharacter do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :advantages, :text
      add :notes, :text
    end
  end
end
