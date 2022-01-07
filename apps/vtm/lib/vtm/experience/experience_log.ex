defmodule Vtm.Experience.ExperienceLog do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  @type t :: %__MODULE__{
    change: integer(),
    character_id: non_neg_integer(),
    character: Vtm.Characters.Character.t(),
    master_id: non_neg_integer(),
    master: VtmAuth.Accounts.User.t(),
    attribute_id: non_neg_integer(),
    attribute: Vtm.Characters.Attribute.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "experience_logs" do
    field :change, :integer

    belongs_to :character, Vtm.Characters.Character
    belongs_to :master, VtmAuth.Accounts.User
    belongs_to :attribute, Vtm.Characters.Attribute

    timestamps()
  end

  @doc false
  def changeset(experience_log, attrs) do
    experience_log
    |> cast(attrs, [:change, :character_id, :master_id, :attribute_id])
    |> foreign_key_constraint(:character_id)
    |> foreign_key_constraint(:master_id)
    |> foreign_key_constraint(:attribute_id)
    |> validate_required([:change, :character_id, :master_id])
  end
end
