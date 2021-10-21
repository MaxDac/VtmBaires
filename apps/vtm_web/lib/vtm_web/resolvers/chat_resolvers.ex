defmodule VtmWeb.Resolvers.ChatResolvers do
  alias Vtm.Chats
  import VtmWeb.Resolvers.Helpers

  alias VtmWeb.Resolvers.ChatHelpers

  def get_main_chat_maps(_, _, _) do
    {:ok, Chats.get_main_chat_maps()}
  end

  def get_chat_maps(%{parent_id: id}, _) do
    {:ok, Chats.get_chat_maps(id)}
  end

  def get_chat(%{id: id}, _) do
    {:ok, Chats.get_map(id)}
  end

  def all_chat_locations(_, _, _) do
    {:ok, Chats.all_chat_locations()}
  end

  def get_chat_entries(%{map_id: map_id}, _) do
    entries =
      Chats.get_chat_entries(map_id)
      |> Enum.map(&ChatHelpers.map_entry/1)

    {:ok, entries}
  end

  def get_admin_chat_entries(%{map_id: map_id, from: from, to: to}, _) do
    entries =
      Chats.get_chat_entries_by_dates(map_id, from, to)
      |> Enum.map(&ChatHelpers.map_entry/1)

    {:ok, entries}
  end

  def create_chat_entry(_, %{entry: entry}, %{context: %{current_user: user}}) do
    entry
    |> Map.put(:character_id, from_global_id?(entry.character_id))
    |> Map.put(:chat_map_id, from_global_id?(entry.chat_map_id))
    |> ChatHelpers.create_chat_entry(user)
  end

  defp check_master(%{master: false}, _), do: true
  defp check_master(%{master: true}, %{role: :master}), do: true
  defp check_master(_, _), do: false

  def create_chat_dice_entry(x, %{entry: entry}, ctx = %{context: %{current_user: user}}) do
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
      {true, true} ->
        throw_result = Chats.random_simulate_master_dice_throw(free_throw)
        create_chat_entry(x, %{ entry: entry |> Map.put(:result, throw_result) }, ctx)
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
