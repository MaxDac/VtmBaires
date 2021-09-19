defmodule Vtm.Repo.Migrations.AddMasterChat do
  use Ecto.Migration

  def change do
    alter table(:chat_entries) do
      add :master, :boolean, default: false
    end
  end
end
