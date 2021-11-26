defmodule Vtm.Experience.ExperienceLog do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

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
