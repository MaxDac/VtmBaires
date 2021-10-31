defmodule Vtm.Chats.ChatEntry do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Character
  alias Vtm.Chats.ChatMap

  schema "chat_entries" do
    field :character_name, :string
    field :result, :string
    field :text, :string
    field :master, :boolean
    field :off_game, :boolean

    belongs_to :character, Character
    belongs_to :chat_map, ChatMap

    timestamps()
  end

  @doc false
  def changeset(chat_entry, attrs) do
    chat_entry
    |> cast(attrs, [:text, :result, :character_name, :master, :off_game, :character_id, :chat_map_id])
    |> validate_required([:character_id, :chat_map_id])
  end
end
