defmodule Vtm.Repo.Migrations.CreateForumThreads do
  use Ecto.Migration

  def change do
    create table(:forum_threads) do
      add :title, :string, null: false
      add :description, :string
      add :forum_section_id, references(:forum_sections, on_delete: :delete_all)
      add :creator_user_id, references(:users, on_delete: :nilify_all)
      add :creator_character_id, references(:characters, on_delete: :nilify_all)

      timestamps()
    end

    create index(:forum_threads, [:forum_section_id])
    create index(:forum_threads, [:creator_user_id])
    create index(:forum_threads, [:creator_character_id])
  end
end
