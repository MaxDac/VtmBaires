defmodule Vtm.Repo.Migrations.AddOrderingToForumSection do
  use Ecto.Migration

  def change do
    alter table(:forum_sections) do
      add :order_type, :string, default: "asc"
    end
  end
end
