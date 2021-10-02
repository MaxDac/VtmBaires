defmodule Vtm.Repo.Migrations.CreateForumSections do
  use Ecto.Migration

  def change do
    create table(:forum_sections) do
      add :title, :string, null: false
      add :description, :string, null: false
      add :on_game, :boolean, default: false, null: false
      add :can_edit, :boolean, default: false, null: false
      add :can_view, :boolean, default: false, null: false

      timestamps()
    end

    create unique_index(:forum_sections, :title, name: :forum_section_title_uk)
  end
end
