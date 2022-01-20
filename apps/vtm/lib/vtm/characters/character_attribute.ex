defmodule Vtm.Characters.CharacterAttribute do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Character
  alias Vtm.Characters.Attribute

  @type t :: %__MODULE__{
    value: non_neg_integer(),
    character_id: non_neg_integer(),
    attribute_id: non_neg_integer(),

    character: Character.t(),
    attribute: Attribute.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "character_attributes" do
    field :value, :integer

    belongs_to :character, Character
    belongs_to :attribute, Attribute

    timestamps()
  end

  def update_changeset(character_attribute, attrs) do
    character_attribute
    |> cast(attrs, [:value])
    |> validate_required([:value])
  end

  @doc false
  def changeset(character_attribute, attrs) do
    character_attribute
    |> cast(attrs, [:value, :character_id, :attribute_id])
    |> foreign_key_constraint(:character_id)
    |> foreign_key_constraint(:attribute_id)
    |> validate_required([:value, :character_id, :attribute_id])
  end
end
