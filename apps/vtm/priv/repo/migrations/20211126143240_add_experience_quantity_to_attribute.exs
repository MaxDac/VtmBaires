defmodule Vtm.Repo.Migrations.AddExperienceQuantityToAttribute do
  use Ecto.Migration

  def change do
    alter table(:attribute_types) do
      add :experience_cost, :integer
    end
  end
end
