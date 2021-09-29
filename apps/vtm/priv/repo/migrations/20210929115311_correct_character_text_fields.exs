defmodule Vtm.Repo.Migrations.CorrectCharacterText_Fields do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      modify :description, :text
      modify :biography, :text
    end
  end
end
