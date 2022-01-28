defmodule VtmWeb.Resolvers.ChatHelpers do
  @moduledoc false

  alias Vtm.Chats

  def map_entry(entry = %{
    character_id: c_id,
    character_name: c_name,
    # character_chat_avatar: c_avatar,
    chat_map_id: map_id
  }) do
    entry
    |> Map.put_new(:character, %{
      id: c_id,
      name: c_name
      # chat_avatar: c_avatar
    })
    |> Map.put(:chat_map, %{
      id: map_id
    })
    |> Map.put(:command, "insert")
  end

  def map_entry_slim(entry = %{
    character_id: c_id,
    character_name: c_name,
    chat_map_id: map_id
  }) do
    entry
    |> Map.put(:character, %{
      id: c_id,
      name: c_name
    })
    |> Map.put(:chat_map, %{
      id: map_id
    })
  end

  def create_chat_entry(entry, user) do
    new_entry =
      case {entry |> Map.get(:text), user.role} do
        {"***" <> rest, :master} ->
          entry
          |> Map.put(:text, rest)
          |> Map.put(:master, true)
        _ ->
          entry
      end

    with {:ok, %{id: id}}             <- Chats.create_chat_entry(new_entry),
         entry when not is_nil(entry) <- Chats.get_chat_entry(id) do
      {:ok, entry |> map_entry()}
    end
  end
end
