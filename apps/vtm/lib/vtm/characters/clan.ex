defmodule Vtm.Characters.Clan do
  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Attribute

  schema "clans" do
    field :name, :string

    many_to_many :attributes, Attribute, join_through: "clan_disciplines", on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset_disciplines(character, attrs, attributes) do
    character
    |> cast(attrs, [:name])
    |> cast_assoc(:attributes)
    |> validate_required([:name])
    |> put_assoc(:attributes, attributes)
  end

  @doc false
  def changeset(character, attrs) do
    character
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
