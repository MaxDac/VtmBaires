defmodule Vtm.Characters.Character do
  use Ecto.Schema
  import Ecto.Changeset

  alias VtmAuth.Accounts.User
  alias Vtm.Characters.Clan
  alias Vtm.Characters.PredatorType

  schema "characters" do
    field :name, :string
    field :avatar, :string
    field :chat_avatar, :string
    field :biography, :string
    field :description, :string
    field :is_npc, :boolean
    field :is_complete, :boolean
    field :experience, :integer
    field :humanity, :integer
    field :generation, :integer
    field :hunger, :integer
    field :health, :integer
    field :damage, :integer
    field :aggravated_damage, :integer
    field :willpower, :integer
    field :willpower_damage, :integer

    field :stage, :integer
    field :approved, :boolean
    field :advantages, :string
    field :notes, :string

    belongs_to :user, User
    belongs_to :clan, Clan
    belongs_to :predator_type, PredatorType

    timestamps()
  end

  def complete_changeset(character, attrs) do
    character
    |> cast(attrs, [:advantages, :notes, :predator_type_id, :is_complete])
    |> foreign_key_constraint(:clan_id)
    |> foreign_key_constraint(:predator_type_id)
    |> validate_required([:advantages, :notes, :predator_type_id])
  end

  def finalize_character_changeset(character, attrs) do
    character
    |> cast(attrs, [:advantages, :notes, :predator_type_id, :is_complete])
    |> foreign_key_constraint(:clan_id)
    |> foreign_key_constraint(:predator_type_id)
    |> validate_required([:advantages, :notes, :predator_type_id])
  end

  def update_changeset(character, attrs) do
    character
    |> cast(attrs, [
      :avatar,
      :biography,
      :description,
      :is_npc,
      :is_complete,
      :experience,
      :humanity,
      :generation,
      :stage,
      :approved
    ])
    |> foreign_key_constraint(:clan_id)
    |> foreign_key_constraint(:predator_type_id)
  end

  @doc false
  def changeset(character, attrs) do
    character
    |> cast(attrs, [
      :name,
      :avatar,
      :chat_avatar,
      :biography,
      :description,
      :is_npc,
      :is_complete,
      :experience,
      :humanity,
      :generation,
      :hunger,
      :health,
      :damage,
      :aggravated_damage,
      :willpower,
      :willpower_damage,
      :stage,
      :approved,
      :user_id,
      :clan_id,
      :predator_type_id,
      :advantages,
      :notes
    ])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:clan_id)
    |> validate_required([:user_id, :name])
  end
end
