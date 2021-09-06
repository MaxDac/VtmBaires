defmodule Vtm.Repo.Migrations.CreateGuideItems do
  use Ecto.Migration

  def change do
    create table(:guide_items) do
      add :title, :string
      add :text, :string
      add :guide_section_id, references(:guide_sections, on_delete: :delete_all)

      timestamps()
    end

    create index(:guide_items, [:guide_section_id])
  end
end
