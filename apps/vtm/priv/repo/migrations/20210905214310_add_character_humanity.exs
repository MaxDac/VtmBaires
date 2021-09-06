defmodule Vtm.Repo.Migrations.AddCharacterHumanity do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :humanity, :integer, default: 7
    end
  end
end
