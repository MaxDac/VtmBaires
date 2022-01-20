defmodule Vtm.Characters.CharacterInfo do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Character

  @type t :: %__MODULE__{
    can_hunt_animals: boolean(),
    is_vegan: boolean(),

    character_id: non_neg_integer(),
    character: Character.t()
  }

  schema "characters_info" do
    field :can_hunt_animals, :boolean, default: false
    field :is_vegan, :boolean, default: false

    belongs_to :character, Character

    timestamps()
  end

  @doc false
  def changeset(character_info, attrs) do
    character_info
    |> cast(attrs, [:character_id, :is_vegan, :can_hunt_animals])
    |> foreign_key_constraint(:character_id)
    |> validate_required([:character_id, :is_vegan, :can_hunt_animals])
  end
end
