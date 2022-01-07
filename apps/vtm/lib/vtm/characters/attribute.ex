defmodule Vtm.Characters.Attribute do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.AttributeType

  @type t :: %__MODULE__{
    description: binary(),
    name: binary(),
    order: non_neg_integer(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "attributes" do
    field :description, :string
    field :name, :string
    field :order, :integer

    belongs_to :attribute_type, AttributeType

    timestamps()
  end

  @doc false
  def update_changeset(attribute, attrs) do
    attribute
    |> cast(attrs, [:description])
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
  @moduledoc false

  alias Vtm.Characters.AttributeType
  alias Vtm.Characters.Attribute
  alias Vtm.Characters.Discipline

  @type t :: %__MODULE__{
    id: non_neg_integer(),
    description: binary(),
    name: binary(),
    attribute_type_id: non_neg_integer(),
    attribute_type: AttributeType.t()
  }

  defstruct id: 0, description: "", name: "", attribute_type_id: 0, attribute_type: %AttributeType{}

  defp merge_values_only(:__struct__, v1, _), do: v1
  defp merge_values_only(_, _, v2), do: v2

  @spec from_attribute(map() | Attribute.t()) :: Discipline.t()
  def from_attribute(attrs = %Attribute{}) do
    %Discipline{} |> Map.merge(attrs, &merge_values_only/3)
  end

  def from_attribute(attrs = %{}) do
    %Discipline{} |> Map.merge(attrs)
  end

  @spec to_attribute(Discipline.t()) :: Attribute.t()
  def to_attribute(attrs = %Discipline{}) do
    %Attribute{} |> Map.merge(attrs, &merge_values_only/3)
  end
end
