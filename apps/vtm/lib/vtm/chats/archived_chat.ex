defmodule Vtm.Chats.ArchivedChat do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  @type t :: %__MODULE__{
    character_name: binary(),
    location_name: binary(),
    text: binary(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "archived_chats" do
    field :character_name, :string
    field :location_name, :string
    field :text, :string

    timestamps()
  end

  @doc false
  def changeset(archived_chat, attrs) do
    archived_chat
    |> cast(attrs, [:location_name, :character_name, :text])
    |> validate_required([:location_name, :character_name, :text])
  end
end
