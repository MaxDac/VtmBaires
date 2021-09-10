defmodule Vtm.Chats do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Chats.ChatMap
  alias Vtm.Chats.ChatEntry

  def get_main_chat_maps() do
    query = from m in ChatMap,
      where: is_nil(m.chat_map_id)

    query |> Repo.all()
  end

  def get_chat_maps(parent_id) do
    query = from m in ChatMap,
      where: m.chat_map_id == ^parent_id

    query |> Repo.all()
  end

  def get_map(chat_id) do
    ChatMap |> Repo.get(chat_id)
  end

  def get_chat_entries(map_id) do
    query = from c in ChatEntry,
      where: c.chat_map_id == ^map_id,
      join: ch in Vtm.Characters.Character,
      on: ch.id == c.character_id,
      select: %{
        id: c.id,
        character_id: ch.id,
        character_name: ch.name,
        result: c.result,
        text: c.result,
        chat_map_id: c.chat_map_id,
      }

    Repo.all(query)
  end

  def create_chat_entry(attrs) do
    %ChatEntry{}
    |> ChatEntry.changeset(attrs)
    |> Repo.insert()
  end

end
