defmodule VtmWeb.Resolvers.MessageResolvers do
  @moduledoc false

  alias Vtm.Messages
  alias Vtm.Messages.Message
  alias Vtm.Messages.MessageDigest
  import VtmWeb.Resolvers.Helpers

  def received_messages(user, _, _) do
    {:ok, Messages.get_user_messages(user)}
  end

  def sent_messages(user, _, _) do
    {:ok, Messages.get_sent_messages(user)}
  end

  def get_message(%{message_id: id}, %{context: %{current_user: user}}) do
    Messages.get_message(user, id)
  end

  defp decode_from_request_if_existent(request, key) do
    case request |> Map.has_key?(key) do
      true ->
        IO.puts "id: #{request[key]}"
        with {:ok, value} <- from_global_id?(request[key]) do
          {:ok, request |> Map.put(key, value)}
        end
      _   ->
        {:ok, request}
    end
  end

  def send_message(_, %{message: message = %{
    on_game: true,
    sender_character_id: sender_character_id,
    receiver_character_id: receiver_character_id
  }}, %{context: %{current_user: user}}) do
    with {:ok, sc_id}   <- from_global_id?(sender_character_id),
         {:ok, rc_id}   <- from_global_id?(receiver_character_id),
         {:ok, message} <- message
                           |> Map.put(:sender_character_id, sc_id)
                           |> Map.put(:receiver_character_id, rc_id)
                           |> decode_from_request_if_existent(:reply_to_id),
         {:ok, message} <- Messages.send_message(user,
                           message
                           |> Map.drop([:receiver_user_id])) do
      {:ok, message |> Map.put(:operation, "send_message")}
    end
  end

  def send_message(_, %{message: message = %{
    receiver_user_id: receiver_user_id
  }}, %{context: %{current_user: user}}) do
    with {:ok, ru_id}   <- from_global_id?(receiver_user_id),
         {:ok, message} <- message
                           |> Map.put(:receiver_user_id, ru_id)
                           |> decode_from_request_if_existent(:reply_to_id),
         {:ok, message} <- Messages.send_message(user,
                           message
                           |> Map.drop([:receiver_character_id, :sender_character_id])) do
      {:ok, message |> Map.put(:operation, "send_message")}
    end
  end

  def send_message(_, request, %{context: context}) do
    IO.puts "request: #{inspect request}"
    IO.puts "context: #{inspect context}"

    {:error, :invalid_request}
  end

  def set_message_read(%{message_id: id}, %{context: %{current_user: user}}) do
    with {:ok, message} <- Messages.set_message_read(user, id) do
      {:ok, message |> Map.put(:operation, "set_message_read")}
    end
  end

  def delete_message(%{message_id: id}, %{context: %{current_user: user}}) do
    with {:ok, message} <- Messages.get_message(user, id) do
      Messages.delete_message(user, message)
    end
  end

  def delete_all_received_message(_, _, %{context: %{current_user: user}}) do
    with :ok <- Messages.delete_all_received_messages(user) do
      {:ok, true}
    end
  end

  def delete_all_sent_message(_, _, %{context: %{current_user: user}}) do
    with :ok <- Messages.delete_all_sent_messages(user) do
      {:ok, true}
    end
  end

  def message_digest(_, _, %{context: %{current_user: %{id: user_id}}}) do
    with digest <- Messages.message_digest(user_id) do
      {:ok, digest}
    end
  end

  def config_message_subscription(%{token: token}, _context) do
    IO.puts "received token for subscription: #{token}"
    with {:ok, %{id: id}} <- VtmWeb.Authentication.verify_subscription_key_token(token) do
      {:ok, topic: id}
    end
  end

  def handle_message_trigger(%{receiver_user_id: id}), do: id
  def handle_message_trigger(_), do: "0"

  def message_subscription_resolver(message = %Message{receiver_user_id: user_id}, _args, _res) do
    with %MessageDigest{unread_messages: count} <- Messages.message_digest(user_id) do
      {:ok, %{
        message: message,
        number_unread: count
      }}
    end
  end
end
