defmodule Vtm.Characters.Character do
  use Ecto.Schema
  import Ecto.Changeset

  alias VtmAuth.Accounts.User
  alias Vtm.Characters.Clan

  schema "characters" do
    field :avatar, :string
    field :biography, :string
    field :description, :string
    field :name, :string
    field :is_npc, :boolean
    field :is_complete, :boolean
    field :experience, :integer
    field :humanity, :integer

    field :stage, :integer
    field :approved, :boolean

    belongs_to :user, User
    belongs_to :clan, Clan

    timestamps()
  end

  @doc false
  def changeset(character, attrs) do
    character
    |> cast(attrs, [:user_id, :name, :is_npc, :clan_id, :avatar, :description, :biography])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:clan_id)
    |> validate_required([:user_id, :name])
  end
end
