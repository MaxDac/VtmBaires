defmodule VtmAuth.Repo.Migrations.CreateRestPasswordRequests do
  use Ecto.Migration

  def change do
    create table(:reset_password_requests) do
      add :ip, :string
      add :host, :text
      add :user_email, :text

      timestamps()
    end

  end
end
