defmodule Vtm.Repo.Migrations.CreateCreationTemplates do
  use Ecto.Migration

  def change do
    create table(:creation_templates) do
      add :name, :string
      add :description, :string

      timestamps()
    end

    create unique_index(:creation_templates, :name, name: :creation_templates_name_uk)

  end
end
