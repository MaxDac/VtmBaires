defmodule Vtm.Repo.Migrations.EnlargeChatLocationDescription do
  use Ecto.Migration

  def change do
    alter table(:chat_maps) do
      modify :description, :text
    end
  end
end
