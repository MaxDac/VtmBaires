defmodule Vtm.Repo.Migrations.AddLastAwakenToCharacter do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :last_awake, :naive_datetime
    end
  end
end
