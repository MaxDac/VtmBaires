defmodule Vtm.Repo.Migrations.AddCharacterSpecialties do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :specialties, :text
    end
  end
end
