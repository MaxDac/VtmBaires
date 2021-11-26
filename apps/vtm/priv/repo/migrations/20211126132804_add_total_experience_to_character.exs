defmodule Vtm.Repo.Migrations.AddTotalExperienceToCharacter do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :total_experience, :integer, default: 0
    end
  end
end
