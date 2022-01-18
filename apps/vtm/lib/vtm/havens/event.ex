defmodule Vtm.Havens.Event do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Character
  alias Vtm.Havens.Haven

  @type t :: %__MODULE__{
    danger_triggered: boolean(),
    resolved: boolean(),

    haven_id: non_neg_integer(),
    haven: Haven.t(),

    character_id: non_neg_integer(),
    character: Character.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "haven_events" do
    field :danger_triggered, :boolean, default: true
    field :resolved, :boolean, default: false

    belongs_to :character, Character
    belongs_to :haven, Haven

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:danger_triggered, :resolved, :character_id, :haven_id])
    |> foreign_key_constraint(:character_id)
    |> foreign_key_constraint(:haven_id)
    |> validate_required([:character_id, :haven_id])
  end
end
