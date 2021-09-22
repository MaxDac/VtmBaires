defmodule VtmAuth.Repo.Migrations.AddSessionInfo do
  use Ecto.Migration

  def change do
    alter table(:sessions) do
      add :host, :text
      add :ip, :string
      add :session_info, :map
    end
  end
end
