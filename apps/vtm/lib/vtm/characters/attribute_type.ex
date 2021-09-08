defmodule Vtm.Characters.AttributeType do
  use Ecto.Schema
  import Ecto.Changeset

  schema "attribute_types" do
    field :name, :string
    field :section, :string

    timestamps()
  end

  @doc false
  def changeset(attribute_type, attrs) do
    attribute_type
    |> cast(attrs, [:name, :section])
    |> validate_required([:name, :section])
  end
end
