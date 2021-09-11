defmodule Vtm.Chats do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Chats.ChatMap
  alias Vtm.Chats.ChatEntry
  alias Vtm.Characters.Character

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

  defp chat_and_character_joined_query() do
    from c in ChatEntry,
      join: ch in Character,
      on: ch.id == c.character_id,
      select: %{
        id: c.id,
        character_id: ch.id,
        character_name: ch.name,
        character_chat_avatar: ch.chat_avatar,
        result: c.result,
        text: c.text,
        chat_map_id: c.chat_map_id,
      }
  end

  def get_chat_entries(map_id) do
    query = from c in chat_and_character_joined_query(),
      where: c.chat_map_id == ^map_id

    Repo.all(query)
  end

  def get_chat_entry(id) do
    query = from c in chat_and_character_joined_query(),
      where: c.id == ^id

    Repo.one(query)
  end

  defp create_chat_entry_p(attrs) do
    %ChatEntry{}
    |> ChatEntry.changeset(attrs)
    |> Repo.insert()
  end

  def create_chat_entry(attrs = %{ text: _ }), do: create_chat_entry_p(attrs)
  def create_chat_entry(attrs = %{ result: _ }), do: create_chat_entry_p(attrs)
  def create_chat_entry(_), do: {:error, "text or result should not be both emtpy."}

end
