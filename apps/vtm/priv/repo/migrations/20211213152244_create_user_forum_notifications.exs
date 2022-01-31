defmodule Vtm.Repo.Migrations.CreateUserForumNotifications do
  use Ecto.Migration

  def change do
    create table(:user_forum_notifications) do
      add :last_checked_date, :naive_datetime
      add :user_id, references(:users, on_delete: :delete_all)
      add :forum_section_id, references(:forum_sections, on_delete: :delete_all)
      add :forum_thread_id, references(:forum_threads, on_delete: :delete_all)

      timestamps()
    end

    create index(:user_forum_notifications, [:user_id])
    create index(:user_forum_notifications, [:forum_section_id])
    create index(:user_forum_notifications, [:forum_thread_id])
  end
end
