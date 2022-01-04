defmodule Vtm.Repo.Migrations.CreateChatRules do
  use Ecto.Migration

  def change do
    create table(:chat_rules) do
      add :chat_map_id, references(:chat_maps, on_delete: :nothing)
      add :guest_user_id, references(:users, on_delete: :nothing)
      add :is_owner, :boolean, default: false

      timestamps()
    end

    create index(:chat_rules, [:chat_map_id])
    create index(:chat_rules, [:guest_user_id])
  end
end
