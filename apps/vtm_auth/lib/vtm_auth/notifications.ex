defmodule VtmAuth.Notifications do
  @moduledoc false

  import Ecto.Query, warn: false

  alias VtmAuth.Repo
  alias VtmAuth.Accounts.User

  @weeks_to_notify 3
  @weeks_between_notify_and_deletion 1

  @spec get_users_to_notify() :: list(User.t())
  def get_users_to_notify() do
    notify_limit =
      NaiveDateTime.utc_now()
      |> NaiveDateTime.add(@weeks_to_notify * 7 * 24 * 60 * 60 * -1)

    User
    |> from()
    |> where([u], u.last_login < ^notify_limit or is_nil(u.last_login))
    |> Repo.all()
  end

  @spec get_users_to_delete() :: list(User.t())
  def get_users_to_delete() do
    notify_limit =
      NaiveDateTime.utc_now()
      |> NaiveDateTime.add(@weeks_between_notify_and_deletion * 7 * 24 * 60 * 60 * -1)

    User
    |> from()
    |> where([u], u.last_notified < ^notify_limit)
    |> Repo.all()
  end

  @spec cleanup_users_not_logged_since(non_neg_integer()) :: {integer(), nil | [term()]}
  def cleanup_users_not_logged_since(weeks) do
    notify_limit =
      NaiveDateTime.utc_now()
      |> NaiveDateTime.add(@weeks_between_notify_and_deletion * 7 * 24 * 60 * 60 * -1)

    User
    |> from()
    |> where([u], u.last_login < ^notify_limit or is_nil(u.last_login))
    |> Repo.delete_all()
  end

  @spec update_user_last_notified(list(non_neg_integer())) :: {integer(), nil | [term()]}
  def update_user_last_notified(ids) do
    now = NaiveDateTime.utc_now()

    User
    |> from()
    |> where([u], u.id in ^ids)
    |> Repo.update_all(set: [last_notified: now])
  end

  @spec delete_users(list(non_neg_integer())) :: {integer(), nil | [term()]}
  def delete_users(ids) do
    User
    |> from()
    |> where([u], u.id in ^ids)
    |> Repo.delete_all()
  end
end
