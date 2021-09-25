defmodule VtmAuth.Repo.Migrations.RemoveSessionUserIdUniqueIndex do
  use Ecto.Migration

  def change do
    drop unique_index(:sessions, :user_id, name: "session_user_unique_idx")
  end
end
