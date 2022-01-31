defmodule VtmAuth.Repo.Migrations.AddLastNotifiedInUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :last_notified, :naive_datetime
    end
  end
end
