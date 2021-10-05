defmodule Vtm.Repo.Migrations.CreateCreationTemplateAttrs do
  use Ecto.Migration

  def change do
    create table(:creation_template_attrs) do
      add :value, :integer
      add :template_id, references(:creation_templates, on_delete: :delete_all)
      add :attribute_id, references(:attributes, on_delete: :delete_all)

      timestamps()
    end

    create index(:creation_template_attrs, [:template_id])
    create index(:creation_template_attrs, [:attribute_id])

    create unique_index(:creation_template_attrs, [:template_id, :attribute_id], name: :creation_templates_attrs_set_uk)
  end
end
