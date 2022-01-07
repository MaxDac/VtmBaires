defmodule Vtm.Messages.Message do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias VtmAuth.Accounts.User
  alias Vtm.Characters.Character

  @type t :: %__MODULE__{
    subject: binary(),
    text: binary(),
    on_game: boolean(),
    read: boolean(),
    hide_for_receiver: boolean(),
    hide_for_sender: boolean(),
    sender_name: binary(),
    sender_user_id: non_neg_integer(),
    sender_user: User.t(),
    receiver_user_id: non_neg_integer(),
    receiver_user: User.t(),
    sender_character_id: non_neg_integer(),
    sender_character: Character.t(),
    receiver_character_id: non_neg_integer(),
    receiver_character: Character.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "messages" do
    field :subject, :string
    field :text, :string
    field :on_game, :boolean
    field :read, :boolean
    field :hide_for_receiver, :boolean
    field :hide_for_sender, :boolean

    # Utility field
    field :sender_name, :string, virtual: true

    belongs_to :sender_user, User
    belongs_to :receiver_user, User
    belongs_to :sender_character, Character
    belongs_to :receiver_character, Character

    timestamps()
  end

  def read_changeset(message, attrs) do
    message
    |> cast(attrs, [:read])
    |> validate_required([:read])
  end

  def hide_changeset(message, attrs) do
    message
    |> cast(attrs, [:hide_for_receiver, :hide_for_sender])
    |> validate_required([:hide_for_receiver, :hide_for_sender])
  end

  def changeset(message, attrs) do
    message
    |> cast(attrs, [:subject, :text, :on_game, :read, :sender_user_id, :receiver_user_id, :sender_character_id, :receiver_character_id])
    |> foreign_key_constraint(:sender_user_id)
    |> foreign_key_constraint(:receiver_user_id)
    |> foreign_key_constraint(:sender_character_id)
    |> foreign_key_constraint(:receiver_character_id)
    |> validate_required([:subject, :text, :sender_user_id, :receiver_user_id])
  end
end
