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
    IO.puts "entry: #{inspect entry}"
    {:ok, inserted_entry = %{ chat_map_id: id }} = Chats.create_chat_entry(entry)
    IO.puts "res: #{inspect inserted_entry}"
    # Absinthe.Subscription.publish(VtmWeb.Endpoint, inserted_entry, new_chat_entry: ["1"])
    {:ok, inserted_entry }
  end
end
