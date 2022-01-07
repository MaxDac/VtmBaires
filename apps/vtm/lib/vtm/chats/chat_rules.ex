defmodule Vtm.Chats.ChatRules do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Chats.ChatMap
  alias VtmAuth.Accounts.User

  @type t :: %__MODULE__{
    is_owner: boolean(),
    chat_map_id: non_neg_integer(),
    chat_map: ChatMap.t(),
    guest_user_id: non_neg_integer(),
    guest_user: User.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "chat_rules" do
    field :is_owner, :boolean

    belongs_to :chat_map, ChatMap
    belongs_to :guest_user, User

    timestamps()
  end

  @doc false
  def changeset(chat_rules, attrs) do
    chat_rules
    |> cast(attrs, [:chat_map_id, :guest_user_id, :is_owner])
    |> foreign_key_constraint(:chat_map_id)
    |> foreign_key_constraint(:guest_user_id)
    |> validate_required([:is_owner])
  end
end
