defmodule Vtm.Repo.Migrations.ClanDisciplinesMtmRelationshipTable do
  use Ecto.Migration

  def change do
    create table(:clan_disciplines, primary_key: false) do
      add :clan_id, references(:clans, on_delete: :delete_all), primary_key: true
      add :attribute_id, references(:attributes, on_delete: :delete_all), primary_key: true

      timestamps()
    end

    create index(:clan_disciplines, [:clan_id])
    create index(:clan_disciplines, [:attribute_id])

    create(
      unique_index(:clan_disciplines, [:clan_id, :attribute_id], name: :clan_disciplines_unique_key)
    )

    alter table(:clan_disciplines) do
      modify(:inserted_at, :timestamp, default: fragment("NOW()"))
      modify(:updated_at, :timestamp, default: fragment("NOW()"))
    end
  end
end
