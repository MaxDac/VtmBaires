defmodule VtmWeb.Resolvers.ChatResolvers do
  alias Vtm.Chats
  import VtmWeb.Resolvers.Helpers

  alias VtmAuth.Accounts

  defp map_entry(entry = %{
    character_id: c_id,
    character_name: c_name,
    character_chat_avatar: c_avatar,
    chat_map_id: map_id
  }) do
    entry
    |> Map.put(:character, %{
      id: c_id,
      name: c_name,
      chat_avatar: c_avatar
    })
    |> Map.put(:chat_map, %{
      id: map_id
    })
  end

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
    entries =
      Chats.get_chat_entries(map_id)
      |> Enum.map(&map_entry/1)

    {:ok, entries}
  end

  def create_chat_entry(_, %{ entry: entry }, %{context: %{current_user: user}}) do
    new_entry =
      entry
      |> Map.put(:character_id, from_global_id?(entry.character_id))
      |> Map.put(:chat_map_id, from_global_id?(entry.chat_map_id))

    new_entry =
      case {new_entry |> Map.get(:text), user.role} do
        {"***" <> rest, :master} ->
          new_entry
          |> Map.put(:text, rest)
          |> Map.put(:master, true)
        _ ->
          new_entry
      end

    with {:ok, %{ id: id }}           <- Chats.create_chat_entry(new_entry),
         entry when not is_nil(entry) <- Chats.get_chat_entry(id),
         {:ok, _}                     <- Accounts.update_session(user) do
      {:ok, entry |> map_entry()}
    end
  end

  defp check_master(%{master: false}, _), do: true
  defp check_master(%{master: true}, %{role: :master}), do: true
  defp check_master(_, _), do: false

  def create_chat_dice_entry(x, %{ entry: entry }, ctx = %{context: %{current_user: user}}) do
    %{
      character_id: character_id,
      attribute_id: attribute_id,
      ability_id: ability_id,
      free_throw: free_throw,
      difficulty: difficulty
    } =
      entry
      |> Map.put(:character_id, from_global_id?(entry.character_id))
      |> Map.put(:attribute_id, from_global_id?(entry.attribute_id))
      |> Map.put(:ability_id, from_global_id?(entry.ability_id))

    case {check_master(entry, user), entry |> Map.get(:master, false)} do
      {true, false} ->
        throw_result = Chats.random_simulate_dice_throw(user.id, character_id, attribute_id, ability_id, free_throw, difficulty)
        create_chat_entry(x, %{ entry: entry |> Map.put(:result, throw_result) }, ctx)
        |> map_entry()
      {true, true} ->
        throw_result = Chats.random_simulate_master_dice_throw(free_throw)
        create_chat_entry(x, %{ entry: entry |> Map.put(:result, throw_result) }, ctx)
        |> map_entry()
      _ ->
        {:error, :unauthorized}
    end
  end

  def config_chat_subscription(%{map_id: map_id, token: token}, _context) do
    IO.puts "received token for subscription: #{token}"
    with {:ok, _} <- VtmWeb.Authentication.verify_subscription_key_token(token) do
      {:ok, topic: from_global_id?(map_id)}
    end
  end

  def handle_chat_trigger(%{ chat_map_id: id }), do: id
  def handle_chat_trigger(_), do: "0"
end
