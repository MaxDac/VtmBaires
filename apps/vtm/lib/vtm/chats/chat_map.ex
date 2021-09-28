defmodule Vtm.Chats.ChatMap do
  use Ecto.Schema
  import Ecto.Changeset

  schema "chat_maps" do
    field :description, :string
    field :image, :string
    field :is_chat, :boolean, default: false
    field :name, :string

    belongs_to :chat_map, __MODULE__

    timestamps()
  end

  @doc false
  def changeset(chat_map, attrs) do
    chat_map
    |> cast(attrs, [:name, :description, :image, :is_chat, :chat_map_id])
    |> unique_constraint(:name, name: :chat_maps_unique_key)
    |> validate_required([:name, :is_chat])
  end
end
