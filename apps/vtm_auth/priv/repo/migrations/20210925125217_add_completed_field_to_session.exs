defmodule VtmAuth.Repo.Migrations.AddCompletedFieldToSession do
  use Ecto.Migration

  def change do
    alter table(:sessions) do
      add :completed, :boolean, default: false
    end
  end
end
