defmodule Vtm.Repo.Migrations.AddGroundControlToHavenEvents do
  use Ecto.Migration

  def change do
    alter table(:haven_locations) do
      add :ground_control, :integer
    end

    alter table(:haven_events) do
      add :control_triggered, :boolean, default: false
    end
  end
end
