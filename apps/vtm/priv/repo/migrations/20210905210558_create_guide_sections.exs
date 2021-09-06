defmodule Vtm.Repo.Migrations.CreateGuideSections do
  use Ecto.Migration

  def change do
    create table(:guide_sections) do
      add :name, :string
      add :description, :string

      timestamps()
    end

  end
end
