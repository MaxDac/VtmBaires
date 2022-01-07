defmodule Vtm.Characters.Clan do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Attribute

  @type t :: %__MODULE__{
    name: binary(),
    selectable: boolean(),
    attributes: list(Attribute.t()),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "clans" do
    field :name, :string
    field :selectable, :boolean

    many_to_many :attributes, Attribute, join_through: "clan_disciplines", on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset_disciplines(character, attrs, attributes) do
    character
    |> cast(attrs, [:name])
    |> cast_assoc(:attributes)
    |> unique_constraint(:name, name: :clans_unique_key)
    |> validate_required([:name])
    |> put_assoc(:attributes, attributes)
  end

  @doc false
  def changeset(character, attrs) do
    character
    |> cast(attrs, [:name])
    |> unique_constraint(:name, name: :clans_unique_key)
    |> validate_required([:name])
  end
end
