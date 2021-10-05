defmodule Vtm.Repo.Migrations.RecreateChatEntriesWithCorrectLimit do
  use Ecto.Migration

  def change do
    drop table("chat_entries")

    create table(:chat_entries) do
      add :text, :text
      add :result, :string
      add :character_name, :string
      add :character_id, references(:characters, on_delete: :delete_all)
      add :chat_map_id, references(:chat_maps, on_delete: :delete_all)

      timestamps()
    end

    create index(:chat_entries, [:character_id])
    create index(:chat_entries, [:chat_map_id])
  end
end
