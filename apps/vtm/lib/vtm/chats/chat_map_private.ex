defmodule Vtm.Chats.ChatMapPrivate do
  @moduledoc false

  use Ecto.Schema

  @type t :: %__MODULE__{
    name: binary(),
    is_private: boolean(),
    is_owner: boolean(),
    chat_count: non_neg_integer(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "private_chat_maps_view" do
    field :name, :string
    field :is_private, :boolean
    field :is_owner, :boolean
    field :chat_count, :integer

    belongs_to :guest_user, VtmAuth.Accounts.User

    timestamps()
  end
end
