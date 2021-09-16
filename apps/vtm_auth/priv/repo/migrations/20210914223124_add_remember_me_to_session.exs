defmodule VtmAuth.Repo.Migrations.AddRememberMeToSession do
  use Ecto.Migration

  def change do
    alter table(:sessions) do
      add :remember, :boolean, default: true
    end
  end
end
