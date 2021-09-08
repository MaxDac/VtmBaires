defmodule Vtm.Characters.CharacterAttribute do
  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Character
  alias Vtm.Characters.Attribute

  schema "character_attributes" do
    field :value, :integer

    belongs_to :character, Character
    belongs_to :attribute, Attribute

    timestamps()
  end

  @doc false
  def changeset(character_attribute, attrs) do
    character_attribute
    |> cast(attrs, [:value, :character_id, :attribute_id])
    |> validate_required([:value, :character_id, :attribute_id])
  end
end
