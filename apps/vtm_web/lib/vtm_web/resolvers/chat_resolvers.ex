defmodule VtmWeb.Resolvers.ChatResolvers do
  @moduledoc false

  alias Vtm.Chats
  alias Vtm.ChatBookings
  import VtmWeb.Resolvers.Helpers

  alias VtmWeb.Resolvers.ChatHelpers

  def get_main_chat_maps(_, _, _) do
    {:ok, Chats.get_main_chat_maps()}
  end

  def get_chat_maps(%{parent_id: id}, %{context: %{current_user: user}}) do
    {:ok, Chats.get_chat_maps(id, user)}
  end

  def get_chat(%{id: id}, _) do
    {:ok, Chats.get_map(id)}
  end

  def all_chat_locations(_, _, _) do
    {:ok, Chats.all_chat_locations()}
  end

  def has_user_access_to_map?(%{chat_id: id}, %{context: %{current_user: user}}) do
    map_id = parsed_id_to_string?(id)
    {:ok, ChatBookings.has_user_access_to_map?(map_id, user)}
  end

  def has_user_already_booked?(_, _, %{context: %{current_user: user}}) do
    {:ok, ChatBookings.has_user_already_booked?(user)}
  end

  def available_users(_, _, _) do
    {:ok, ChatBookings.available_users()}
  end

  def available_private_chats(_, _, _) do
    {:ok, ChatBookings.available_private_chats()}
  end

  def book_chat_map(%{chat_id: id}, %{context: %{current_user: user}}) do
    map_id = parsed_id_to_string?(id)
    ChatBookings.book_chat_map(map_id, user)
  end

  def add_user_to_chat(_, %{request: %{chat_map_id: c_id, guest_user_id: g_id}}, %{context: %{current_user: user}}) do
    with {:ok, chat_map_id}   <- from_global_id?(c_id),
         {:ok, guest_user_id} <- from_global_id?(g_id) do
      ChatBookings.add_user_to_chat(chat_map_id, guest_user_id, user)
    end
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
    with {:ok, c_id}  <- from_global_id?(entry.character_id),
         {:ok, m_id}  <- from_global_id?(entry.chat_map_id) do
      case entry do
        %{off_game: off_game} when not is_nil(off_game) ->
          entry
        _ ->
          entry
          |> Map.put(:off_game, false)
      end
      |> Map.put(:character_id, c_id)
      |> Map.put(:chat_map_id, m_id)
      |> ChatHelpers.create_chat_entry(user)
    end
  end

  defp check_master(%{master: false}, _), do: true
  defp check_master(%{master: true}, %{role: :master}), do: true
  defp check_master(_, _), do: false

  def create_chat_dice_entry(x, %{entry: entry}, ctx = %{context: %{current_user: user}}) do
    with {:ok, c_id}  <- from_global_id?(entry.character_id),
         {:ok, at_id} <- from_global_id_if_not_null?(entry.attribute_id),
         {:ok, ab_id} <- from_global_id_if_not_null?(entry.ability_id) do

      request = %{
        character_id: character_id,
        free_throw: free_throw
      } =
        entry
        |> Map.put(:character_id, c_id)
        |> Map.put(:attribute_id, at_id)
        |> Map.put(:ability_id, ab_id)

      case {check_master(entry, user), entry |> Map.get(:master, false)} do
        {true, false} ->
          throw_result = Chats.random_simulate_dice_throw(user.id, character_id, request)
          create_chat_entry(x, %{entry: entry |> Map.put(:result, throw_result)}, ctx)
        {true, true} ->
          throw_result = Chats.random_simulate_master_dice_throw(free_throw)
          create_chat_entry(x, %{entry: entry |> Map.put(:result, throw_result)}, ctx)
        _ ->
          {:error, :illegal_access}
      end
    end
  end

  def config_chat_subscription(%{map_id: map_id, token: token}, _context) do
    with {:ok, _}     <- VtmWeb.Authentication.verify_subscription_key_token(token),
         {:ok, m_id}  <- from_global_id?(map_id) do
      {:ok, topic: m_id}
    end
  end

  def handle_chat_trigger(%{chat_map_id: id}), do: id
  def handle_chat_trigger(_), do: "0"
end
