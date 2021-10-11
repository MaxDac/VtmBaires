defmodule VtmWeb.Resolvers.MessageResolvers do
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

  def send_message(_, %{message: message}, %{context: %{current_user: user}}) do
    message =
      message
      |> Map.new(fn
        {:receiver_user_id, v}      -> {:receiver_user_id, from_global_id?(v)}
        {:sender_character_id, v}   -> {:sender_character_id, from_global_id?(v)}
        {:receiver_character_id, v} -> {:receiver_character_id, from_global_id?(v)}
        {:reply_to_id, v}           -> {:reply_to_id, from_global_id?(v)}
        {key, value}                -> {key, value}
      end)

    Messages.send_message(user, message)
  end

  def set_message_read(%{message_id: id}, %{context: %{current_user: user}}) do
    Messages.set_message_read(user, id)
  end

  def delete_message(%{message_id: id}, %{context: %{current_user: user}}) do
    with {:ok, message} <- Messages.get_message(user, id) do
      Messages.delete_message(user, message)
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

  def handle_message_trigger(%{ receiver_user_id: id }), do: id
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
