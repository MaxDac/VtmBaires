defmodule Vtm.Repo.Migrations.CreateCharacters do
  use Ecto.Migration

  def change do
    create table(:characters) do
      add :name, :string
      add :avatar, :string
      add :description, :string
      add :biography, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :clan_id, references(:clans, on_delete: :nothing)

      timestamps()
    end

    create index(:characters, [:user_id])
    create index(:characters, [:clan_id])
  end
end
