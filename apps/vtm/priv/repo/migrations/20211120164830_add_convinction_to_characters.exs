defmodule Vtm.Repo.Migrations.AddconvictionToCharacters do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :convictions, :text
    end
  end
end
