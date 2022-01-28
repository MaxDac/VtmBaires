defmodule Vtm.Repo.Migrations.AddHideChatEntry do
  use Ecto.Migration

  def change do
    alter table(:chat_entries) do
      add :hide, :boolean, default: false
    end
  end
end
