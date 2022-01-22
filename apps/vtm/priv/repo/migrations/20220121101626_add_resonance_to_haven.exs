defmodule Vtm.Repo.Migrations.AddResonanceToHaven do
  use Ecto.Migration

  def change do
    alter table(:haven_locations) do
      add :resonance, :string
    end
  end
end
