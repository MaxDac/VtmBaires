defmodule VtmWeb.Resolvers.ChatResolvers do
  alias Vtm.Chats

  @map_object_identifier "map-"

  @doc """
  This function is necessary due to limitations in Relay for elements with the same id of different types.
  """
  defp map_chat_map(map) do
    %{ map | id: "#{@map_object_identifier}#{map.id}" }
  end

  defp put_in_ok_tuple(el) do
    {:ok, el}
  end

  defp sanitize_map_id(id) do
    id |> String.replace(@map_object_identifier, "")
  end

  def get_main_chat_maps(_, _, _) do
    Chats.get_main_chat_maps()
    |> Enum.map(&map_chat_map/1)
    |> put_in_ok_tuple()
  end

  def get_chat_maps(_, %{ parent_id: id }, _) do
    id
    |> sanitize_map_id()
    |> Chats.get_chat_maps()
    |> Enum.map(&map_chat_map/1)
    |> put_in_ok_tuple()
  end

  def get_chat(_, %{ id: id }, _) do
    id
    |> sanitize_map_id()
    |> Chats.get_map()
    |> map_chat_map()
    |> put_in_ok_tuple()
  end

  def get_chat_entries(_, %{ map_id: map_id }, _) do
    map_id
    |> sanitize_map_id()
    |> Chats.get_chat_entries()
    |> put_in_ok_tuple()
  end

  def create_chat_entry(_, %{ entry: entry }, _) do
    with {:ok, %{ id: id }}           <- Chats.create_chat_entry(entry),
         entry when not is_nil(entry) <- Chats.get_chat_entry(id) do
      {:ok, entry}
    end
  end
end
