defmodule Vtm.Repo.Migrations.AddingAttributeOrder do
  use Ecto.Migration

  def change do
    alter table(:attributes) do
      add :order, :integer, default: 0
    end
  end
end
