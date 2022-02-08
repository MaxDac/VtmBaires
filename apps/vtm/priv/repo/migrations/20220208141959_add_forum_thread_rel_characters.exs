defmodule Vtm.Repo.Migrations.AddForumThreadRelCharacters do
  use Ecto.Migration

  def change do
    create table(:forum_threads_allowed_characters, primary_key: false) do
      add :forum_thread_id, references(:forum_threads, on_delete: :delete_all), primary_key: true
      add :character_id, references(:characters, on_delete: :delete_all), primary_key: true

      timestamps()
    end

    create index(:forum_threads_allowed_characters, [:forum_thread_id])
    create index(:forum_threads_allowed_characters, [:character_id])

    create(
      unique_index(:forum_threads_allowed_characters, [:forum_thread_id, :character_id], name: :forum_threads_allowed_characters_unique_key)
    )

    alter table(:forum_threads_allowed_characters) do
      modify(:inserted_at, :timestamp, default: fragment("NOW()"))
      modify(:updated_at, :timestamp, default: fragment("NOW()"))
    end
  end
end
