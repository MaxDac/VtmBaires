defmodule Vtm.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :last_checked, :naive_datetime
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:sessions, [:user_id])

    create unique_index(:sessions, :user_id, name: "session_user_unique_idx")
  end
end
