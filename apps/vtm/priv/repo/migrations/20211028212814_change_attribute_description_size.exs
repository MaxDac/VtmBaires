defmodule Vtm.Repo.Migrations.ChangeAttributeDescriptionSize do
  use Ecto.Migration

  def change do
    alter table(:attributes) do
      modify :description, :text
    end
  end
end
