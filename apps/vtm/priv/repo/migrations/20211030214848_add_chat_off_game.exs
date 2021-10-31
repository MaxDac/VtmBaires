defmodule Vtm.Repo.Migrations.AddChatOffGame do
  use Ecto.Migration

  def change do
    alter table(:chat_entries) do
      add :off_game, :boolean, default: false
    end
  end
end
