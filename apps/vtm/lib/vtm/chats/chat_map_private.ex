defmodule Vtm.Chats.ChatMapPrivate do
  @moduledoc false

  use Ecto.Schema

  schema "private_chat_maps_view" do
    field :name, :string
    field :is_private, :boolean
    field :is_owner, :boolean
    field :chat_count, :integer

    belongs_to :guest_user, VtmAuth.Accounts.User

    timestamps()
  end
end
