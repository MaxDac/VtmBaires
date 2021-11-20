defmodule Vtm.Repo.Migrations.AddConvinctionToCharacters do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :convinctions, :text
    end
  end
end
