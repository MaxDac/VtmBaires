defmodule Vtm.Characters.PredatorType do
  use Ecto.Schema
  import Ecto.Changeset

  schema "predator_types" do
    field :description, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(predator_type, attrs) do
    predator_type
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
