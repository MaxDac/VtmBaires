defmodule Vtm.Repo.Migrations.CreateForumPosts do
  use Ecto.Migration

  def change do
    create table(:forum_posts) do
      add :text, :text, null: false
      add :creator_user_id, references(:users, on_delete: :nilify_all)
      add :creator_character_id, references(:characters, on_delete: :nilify_all)
      add :forum_thread_id, references(:forum_threads, on_delete: :delete_all)
      add :forum_section_id, references(:forum_sections, on_delete: :delete_all)

      timestamps()
    end

    create index(:forum_posts, [:creator_user_id])
    create index(:forum_posts, [:creator_character_id])
    create index(:forum_posts, [:forum_thread_id])
    create index(:forum_posts, [:forum_section_id])
  end
end
