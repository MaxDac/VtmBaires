defmodule Vtm.Repo.Migrations.CreateChatMaps do
  use Ecto.Migration

  def change do
    create table(:chat_maps) do
      add :name, :string
      add :description, :string
      add :image, :string
      add :is_chat, :boolean, default: false, null: false
      add :chat_map_id, references(:chat_maps, on_delete: :nothing)

      timestamps()
    end

    create index(:chat_maps, [:chat_map_id])
  end
end
