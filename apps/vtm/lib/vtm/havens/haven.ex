defmodule Vtm.Havens.Haven do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Character

  @type t :: %__MODULE__{
    name: binary(),
    x: non_neg_integer(),
    y: non_neg_integer(),
    resonance: binary(),
    danger: non_neg_integer(),
    ground_control: non_neg_integer(),
    difficulty: integer(),
    owner_difficulty: integer(),
    resources_level: non_neg_integer(),

    character_id: non_neg_integer(),
    character: Character.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "haven_locations" do
    field :name, :string, virtual: true
    field :x, :integer
    field :y, :integer
    field :resonance, :string
    field :danger, :integer
    field :ground_control, :integer
    field :difficulty, :integer
    field :owner_difficulty, :integer
    field :resources_level, :integer

    belongs_to :character, Character

    timestamps()
  end

  def add_character_changeset(haven, attrs) do
    haven
    |> cast(attrs, [:character_id])
    |> foreign_key_constraint(:character_id)
  end

  def modify_danger_changeset(haven, attrs) do
    haven
    |> cast(attrs, [:danger])
    |> foreign_key_constraint(:danger)
  end

  @doc false
  def changeset(haven, attrs) do
    haven
    |> cast(attrs, [:x, :y, :resonance, :difficulty, :owner_difficulty, :danger, :ground_control, :resources_level])
    |> unique_constraint([:x, :y], name: :haven_locations_unique_key)
    |> validate_required([:x, :y, :resonance, :difficulty, :owner_difficulty, :danger, :ground_control, :resources_level])
  end
end
