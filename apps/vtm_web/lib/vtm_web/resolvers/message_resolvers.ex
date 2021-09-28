defmodule VtmWeb.Resolvers.MessageResolvers do
  alias Vtm.Messages
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
end
