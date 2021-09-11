defmodule Vtm.Repo.Migrations.AddCharacterChatAvatar do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :hunger, :integer
      add :health, :integer
      add :damange, :integer, default: 0
      add :aggravated_damage, :integer, default: 0
      add :willpower, :integer
      add :willpower_damage, :integer, default: 0
      add :chat_avatar, :text
    end
  end
end
