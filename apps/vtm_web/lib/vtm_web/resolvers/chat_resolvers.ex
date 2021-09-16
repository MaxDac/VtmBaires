defmodule VtmWeb.Resolvers.ChatResolvers do
  alias Vtm.Chats
  import VtmWeb.Resolvers.Helpers

  alias VtmAuth.Accounts

  def get_main_chat_maps(_, _, _) do
    {:ok, Chats.get_main_chat_maps()}
  end

  def get_chat_maps(%{ parent_id: id }, _) do
    {:ok, Chats.get_chat_maps(id)}
  end

  def get_chat(%{ id: id }, _) do
    {:ok, Chats.get_map(id)}
  end

  def get_chat_entries(%{ map_id: map_id }, _) do
    {:ok, Chats.get_chat_entries(map_id)}
  end

  def create_chat_entry(_, %{ entry: entry }, %{context: %{current_user: user}}) do
    new_entry =
      entry
      |> Map.put(:character_id, from_global_id?(entry.character_id))
      |> Map.put(:chat_map_id, from_global_id?(entry.chat_map_id))

    with {:ok, %{ id: id }}           <- Chats.create_chat_entry(new_entry),
         entry when not is_nil(entry) <- Chats.get_chat_entry(id),
         {:ok, _}                     <- Accounts.update_session(user) do
      {:ok, entry}
    end
  end

  def config_chat_subscription(%{map_id: map_id}, _context) do
    {:ok, topic: from_global_id?(map_id)}
  end
end
