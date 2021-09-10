defmodule Vtm.Repo.Migrations.CreateChatEntries do
  use Ecto.Migration

  def change do
    create table(:chat_entries) do
      add :text, :string
      add :result, :string
      add :character_name, :string
      add :character_id, references(:characters, on_delete: :nothing)
      add :chat_map_id, references(:chat_maps, on_delete: :nothing)

      timestamps()
    end

    create index(:chat_entries, [:character_id])
    create index(:chat_entries, [:chat_map_id])
  end
end
