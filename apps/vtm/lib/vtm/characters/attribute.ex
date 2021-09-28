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
    |> unique_constraint(:name, name: :attributes_unique_key)
    |> validate_required([:name, :attribute_type_id])
  end
end

defmodule Vtm.Characters.Discipline do
  alias Vtm.Characters.AttributeType
  alias Vtm.Characters.Attribute
  alias Vtm.Characters.Discipline

  defstruct id: 0, description: "", name: "", attribute_type_id: 0, attribute_type: %AttributeType{}

  defp merge_values_only(:__struct__, v1, _), do: v1
  defp merge_values_only(_, _, v2), do: v2

  @spec from_attribute(%{} | %Attribute{}) :: %Discipline{}
  def from_attribute(attrs = %Attribute{}) do
    %Discipline{} |> Map.merge(attrs, &merge_values_only/3)
  end

  def from_attribute(attrs = %{}) do
    %Discipline{} |> Map.merge(attrs)
  end

  @spec to_attribute(%Discipline{}) :: %Attribute{}
  def to_attribute(attrs = %Discipline{}) do
    %Attribute{} |> Map.merge(attrs, &merge_values_only/3)
  end
end
