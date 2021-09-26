defmodule Vtm.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :subject, :string
      add :text, :text
      add :on_game, :boolean, default: false
      add :read, :boolean, default: false
      add :hide_for_receiver, :boolean, default: false
      add :hide_for_sender, :boolean, default: false
      add :sender_user_id, references(:users, on_delete: :nothing)
      add :receiver_user_id, references(:users, on_delete: :nothing)
      add :sender_character_id, references(:characters, on_delete: :nothing)
      add :receiver_character_id, references(:characters, on_delete: :nothing)

      timestamps()
    end

    create index(:messages, [:sender_user_id])
    create index(:messages, [:receiver_user_id])
    create index(:messages, [:sender_character_id])
    create index(:messages, [:receiver_character_id])
  end
end
