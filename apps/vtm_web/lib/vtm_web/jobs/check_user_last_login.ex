defmodule VtmWeb.Jobs do
  @moduledoc false

  require Logger

  alias VtmAuth.Notifications
  alias VtmAuth.Accounts.User

  def send_notifications() do
    Notifications.get_users_to_notify()
    |> Enum.map(&send_notification_email/1)
    |> Notifications.update_user_last_notified()
  end

  def delete_unused_users() do
    Notifications.get_users_to_delete()
    |> Enum.map(fn %{id: id} -> id end)
    |> Notifications.delete_users()
  end

  @spec send_notification_email(User.t()) :: non_neg_integer()
  defp send_notification_email(%{id: user_id, name: username, email: email}) do
    case VtmWeb.UserEmail.cancellation_warning(username, email) |> VtmWeb.Mailer.deliver() do
      {:ok, _} ->
        user_id
      error = {:error, _} ->
        Logger.error("There was an error trying to send an email to #{email}")
        Logger.error("#{inspect(error)}")
        user_id
    end
  end
end
