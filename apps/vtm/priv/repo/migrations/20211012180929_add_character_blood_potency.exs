defmodule Vtm.Repo.Migrations.AddCharacterBloodPotency do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :blood_potency, :integer, default: 0
    end
  end
end
