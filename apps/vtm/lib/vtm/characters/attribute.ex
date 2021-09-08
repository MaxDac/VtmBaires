defmodule Vtm.Characters.Attribute do
  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.AttributeType

  schema "attributes" do
    field :description, :string
    field :name, :string

    belongs_to :attribute_type, AttributeType

    timestamps()
  end

  @doc false
  def changeset(attribute, attrs) do
    attribute
    |> cast(attrs, [:name, :description, :attribute_type_id])
    |> validate_required([:name, :attribute_type_id])
  end
end
