defmodule Vtm.ChatBookings do
  @moduledoc false

  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Chats.ChatMap
  alias Vtm.Chats.ChatRules
  alias Vtm.Chats.ChatMapPrivate
  alias VtmAuth.Accounts.User

  @spec available_chats(integer(), map()) :: list(ChatMap)
  def available_chats(parent_id, %{role: :master}) do
    ChatMap
    |> from()
    |> where([m], m.chat_map_id == ^parent_id)
    |> Repo.all()
  end

  def available_chats(parent_id, %{id: user_id}) do
    query =
      from m in ChatMap,
        left_join: r in ChatMapPrivate,
        on: r.id == m.id and r.guest_user_id == ^user_id,
        where: (m.chat_map_id == ^parent_id) and
               (m.is_private == false or not is_nil(r.id)),
        distinct: true,
        select: m

    query
    |> Repo.all()
  end

  @spec available_users() :: list(User.t())
  def available_users() do
    User
    |> from()
    |> join(:left, [u], c in ChatMapPrivate, on: u.id == c.guest_user_id)
    |> where([_, c], is_nil(c.guest_user_id))
    |> distinct(true)
    |> select([u, _], u)
    |> Repo.all()
  end

  @spec has_user_access_to_map?(integer(), map()) :: boolean()
  def has_user_access_to_map?(_, %{role: :master}), do: true

  def has_user_access_to_map?(chat_id, %{id: user_id}) do
    query =
      from m in ChatMap,
        join: r in ChatMapPrivate,
        on: r.id == m.id and r.guest_user_id == ^user_id,
        where: (m.id == ^chat_id) and
               (m.is_private == false or not is_nil(r.id)),
        select: m

    query
    |> Repo.exists?()
  end

  @spec has_user_already_booked?(User.t()) :: boolean()
  def has_user_already_booked?(%{id: user_id}) do
    ChatMapPrivate
    |> from()
    |> where([m], m.guest_user_id == ^user_id)
    |> Repo.exists?()
  end

  @spec available_private_chats() :: list(ChatMap.t())
  def available_private_chats() do
    query =
      from m in ChatMap,
        join: r in ChatMapPrivate,
        on: r.id == m.id,
        where: is_nil(r.guest_user_id),
        where: m.is_private == true,
        select: m

    query |> Repo.all()
  end

  @spec is_chat_available(integer()) :: boolean()
  def is_chat_available(chat_map_id) do
    available_private_chats()
    |> Enum.any?(fn
      %{id: ^chat_map_id} -> true
      _                   -> false
    end)
  end

  @spec query_rules_by_user(integer(), boolean(), %{:id => integer(), optional(any) => any}) :: boolean()
  defp query_rules_by_user(chat_map_id, is_owner, %{id: user_id}) do
    query =
      from m in ChatMap,
        join: r in ChatMapPrivate,
        on: r.id == m.id and r.guest_user_id == ^user_id and r.is_owner == ^is_owner,
        where: m.is_private == true,
        where: m.id == ^chat_map_id,
        select: m

    query |> Repo.exists?()
  end

  @spec is_user_owner(integer(), User.t()) :: boolean()
  def is_user_owner(chat_map_id, user) do
    query_rules_by_user(chat_map_id, true, user)
  end

  @spec is_user_guest(integer(), integer()) :: boolean()
  def is_user_guest(chat_map_id, guest_user_id) do
    query_rules_by_user(chat_map_id, false, %{id: guest_user_id})
  end

  @spec book_chat_map(integer(), User.t()) :: {:ok, ChatMap.t()} | {:error, binary() | Ecto.Changeset.t()}
  def book_chat_map(chat_map_id, user = %{id: user_id}) do
    case {has_user_already_booked?(user), is_chat_available(chat_map_id)} do
      {_, false} ->
        {:error, "La chat selezionata non è attualmente disponibile"}
      {true, _} ->
        {:error, "Hai già prenotato una stanza, o sei stato invitato in un'altra stanza"}
      _ ->
        %ChatRules{}
        |> ChatRules.changeset(%{chat_map_id: chat_map_id, guest_user_id: user_id, is_owner: true})
        |> Repo.insert()
    end
  end

  @spec add_user_to_chat(integer(), integer(), User.t()) :: {:ok, ChatMap.t()} | {:error, binary() | Ecto.Changeset.t()}
  def add_user_to_chat(chat_map_id, guest_user_id, user) do
    case {is_user_owner(chat_map_id, user), is_user_guest(chat_map_id, guest_user_id)} do
      {false, _} ->
        {:error, "Non sei il proprietario della chat privata"}
      {_, true} ->
        {:error, "L'utente è già stato invitato"}
      _ ->
        %ChatRules{}
        |> ChatRules.changeset(%{chat_map_id: chat_map_id, guest_user_id: guest_user_id, is_owner: false})
        |> Repo.insert()
    end
  end
end
