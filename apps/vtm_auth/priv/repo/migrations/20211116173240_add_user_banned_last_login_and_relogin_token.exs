defmodule VtmAuth.Repo.Migrations.AddUserBannedLastLoginAndReloginToken do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :banned, :boolean, default: false
      add :last_login, :naive_datetime
      add :relogin_token, :text
    end
  end
end
