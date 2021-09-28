defmodule Vtm.Repo.Migrations.AddUniqueConstraints do
  use Ecto.Migration

  def change do

    create unique_index(:attribute_types, [:name, :section], name: :attribute_types_unique_key)
    create unique_index(:attributes, :name, name: :attributes_unique_key)
    create unique_index(:clans, :name, name: :clans_unique_key)
    create unique_index(:predator_types, :name, name: :predator_types_unique_key)
    create unique_index(:chat_maps, :name, name: :chat_maps_unique_key)

  end
end
