defmodule Vtm.Repo.Migrations.AddPrivateChatFlagToLocation do
  use Ecto.Migration

  def change do
    alter table(:chat_maps) do
      add :is_private, :boolean, default: false
    end
  end
end
