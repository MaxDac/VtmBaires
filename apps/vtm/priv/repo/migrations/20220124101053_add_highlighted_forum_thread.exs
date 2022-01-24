defmodule Vtm.Repo.Migrations.AddHighlightedForumThread do
  use Ecto.Migration

  def change do
    alter table(:forum_threads) do
      add :highlighted, :boolean, default: false
    end
  end
end
