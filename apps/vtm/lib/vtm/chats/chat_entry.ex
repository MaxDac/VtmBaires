defmodule Vtm.Chats.ChatEntry do
  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Character
  alias Vtm.Chats.ChatMap

  schema "chat_entries" do
    field :character_name, :string
    field :result, :string
    field :text, :string

    belongs_to :character, Character
    belongs_to :chat_map, ChatMap

    timestamps()
  end

  @doc false
  def changeset(chat_entry, attrs) do
    chat_entry
    |> cast(attrs, [:text, :result, :character_name, :character_id, :chat_map_id])
    |> validate_required([:text, :result, :character_id, :chat_map_id])
  end
end
