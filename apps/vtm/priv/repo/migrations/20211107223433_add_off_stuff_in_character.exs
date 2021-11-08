defmodule Vtm.Repo.Migrations.AddOffStuffInCharacter do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :soundtrack, :text
      add :off, :text
    end
  end
end
