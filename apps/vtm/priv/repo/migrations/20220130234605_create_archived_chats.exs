defmodule Vtm.Repo.Migrations.CreateArchivedChats do
  use Ecto.Migration

  def change do
    create table(:archived_chats) do
      add :location_name, :string
      add :character_name, :string
      add :text, :text

      timestamps()
    end
  end
end
