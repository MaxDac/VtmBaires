defmodule VtmWeb.Resolvers.MessageResolvers do
  alias Vtm.Messages
  # import VtmWeb.Resolvers.Helpers

  def received_messages(user, _, _) do
    {:ok, Messages.get_user_messages(user)}
  end

  def sent_messages(user, _, _) do
    {:ok, Messages.get_sent_messages(user)}
  end

  def get_message(%{message_id: id}, %{context: %{current_user: user}}) do
    Messages.get_message(user, id)
  end

  def send_message(_, request, %{context: %{current_user: user}}) do
    Messages.send_message(user, request)
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
