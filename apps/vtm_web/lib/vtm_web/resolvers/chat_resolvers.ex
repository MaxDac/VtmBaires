defmodule VtmWeb.Resolvers.ChatResolvers do
  alias Vtm.Chats

  def get_main_chat_maps(_, _, _) do
    {:ok, Chats.get_main_chat_maps()}
  end

  def get_chat_maps(_, %{ parent_id: id }, _) do
    IO.puts "parent id: #{id}"
    {:ok, Chats.get_chat_maps(id)}
  end

  def get_chat(_, %{ id: id }, _) do
    {:ok, Chats.get_map(id)}
  end

  def get_chat_entries(_, %{ map_id: map_id }, _) do
    {:ok, Chats.get_chat_entries(map_id)}
  end

  def create_chat_entry(_, %{ entry: entry }, _) do
    with {:ok, %{ id: id }}           <- Chats.create_chat_entry(entry),
         entry when not is_nil(entry) <- Chats.get_chat_entry(id) do
      {:ok, entry}
    end
  end
end
