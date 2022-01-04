defmodule Vtm.Chats.ChatRules do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Chats.ChatMap
  alias VtmAuth.Accounts.User

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
