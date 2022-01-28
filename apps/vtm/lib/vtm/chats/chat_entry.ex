defmodule Vtm.Chats.ChatEntry do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Character
  alias Vtm.Chats.ChatMap

  @type t :: %__MODULE__{
    character_name: binary(),
    result: binary(),
    text: binary(),
    master: boolean(),
    off_game: boolean(),
    character_id: non_neg_integer(),
    character: Character.t(),
    chat_map_id: non_neg_integer(),
    chat_map: ChatMap.t(),
    hide: boolean(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "chat_entries" do
    field :character_name, :string
    field :result, :string
    field :text, :string
    field :master, :boolean
    field :off_game, :boolean
    field :hide, :boolean

    belongs_to :character, Character
    belongs_to :chat_map, ChatMap

    timestamps()
  end

  @doc false
  def update_changeset(chat_entry, attrs) do
    chat_entry
    |> cast(attrs, [:text, :result, :master, :off_game, :hide])
  end

  @doc false
  def changeset(chat_entry, attrs) do
    chat_entry
    |> cast(attrs, [:text, :result, :character_name, :master, :off_game, :character_id, :chat_map_id, :hide])
    |> validate_required([:character_id, :chat_map_id])
  end
end
