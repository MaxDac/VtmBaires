defmodule Vtm.Repo.Migrations.AddCharacterHuntStatus do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :last_resonance, :string
      add :last_resonance_intensity, :integer, default: 1
      add :last_hunt, :naive_datetime
    end
  end
end
