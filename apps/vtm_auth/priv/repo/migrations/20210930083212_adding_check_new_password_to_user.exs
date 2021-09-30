defmodule VtmAuth.Repo.Migrations.AddingCheckNewPasswordToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :needs_new_password, :boolean, default: true
    end

    create unique_index(:users, [:name])
  end
end
