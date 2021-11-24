defmodule Vtm.Messages do
  @moduledoc false

  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Messages.Message
  alias Vtm.Messages.MessageDigest
  alias Vtm.Characters.Character
  alias VtmAuth.Accounts
  alias VtmAuth.Accounts.User

  alias Vtm.Characters

  import Vtm.Helpers

  defp aggregate_user(attrs = %{
    receiver_character_id: c_id
  }) do
    case Characters.get_character_user(%{id: c_id}) do
      %{id: id} when not is_nil(id) -> attrs |> Map.put(:receiver_user_id, id)
      _                             -> attrs
    end
  end

  defp aggregate_user_if_inexistent(attrs = %{
    receiver_user_id: nil,
    receiver_character_id: c_id
  }) when not is_nil(c_id) do
    aggregate_user(attrs)
  end

  defp aggregate_user_if_inexistent(attrs) do
    attrs
  end

  @doc """
  The messare instance returned from the message creation does not contain neither the sender user nor the character.
  This method populates only the name of the sender for notification purpouses.
  """
  @spec parse_sender_name({:ok, Message.t()} | {:error, any()}) :: {:ok, Message.t()} | {:error, any()}
  def parse_sender_name({:ok, message = %Message{sender_character_id: character_id}}) when not is_nil(character_id) do
    case Characters.get_character_name_by_id(character_id) do
      nil   -> parse_sender_name({:ok, message |> Map.drop([:receiver_character_id])})
      name  -> {:ok, message |> Map.put(:sender_name, name)}
    end
  end

  def parse_sender_name({:ok, message = %Message{sender_user_id: user_id}}) do
    case Accounts.get_user_name_by_id(user_id) do
      nil   -> {:ok, message}
      name  -> {:ok, message |> Map.put(:sender_name, name)}
    end
  end

  def parse_sender_name(e), do: e

  defp send_message_p(%{id: user_id}, attrs) do
    new_attrs =
      attrs
      |> map_to_atom_map()
      |> Map.put(:sender_user_id, user_id)
      |> aggregate_user_if_inexistent()

    case new_attrs do
      %{sender_user_id: id, receiver_user_id: id} ->
        {:error, "Cannot send a message to the same user"}
      as ->
        %Message{}
        |> Message.changeset(as)
        |> Repo.insert()
        |> parse_sender_name()
    end
  end

  def send_message(user, attrs = %{text: text, reply_to_id: reply_to_id}) when not is_nil(reply_to_id) do
    with {:ok, %{text: replied_text}} <- get_message(user, reply_to_id),
         new_text                     <- "#{text}\n\n-------------\n\n[i]#{replied_text}[/i]" do
      send_message_p(user, attrs |> Map.put(:text, new_text))
    end
  end

  def send_message(user, attrs) do
    send_message_p(user, attrs)
  end

  def send_master_message(receiver_user_id, subject, message) do
    %{id: id} =
      from(u in User, where: u.name == "Storyteller")
      |> Repo.one()

    %Message{}
    |> Message.changeset(%{
      subject: subject,
      text: message,
      on_game: false,
      sender_user_id: id,
      receiver_user_id: receiver_user_id
    })
    |> Repo.insert()
  end

  defp remap_message(message = %Message{
    sender_character: {s_id, s_name},
    receiver_character: {r_id, r_name}
  }) when not is_nil(s_id) and not is_nil(r_id) do
    message
    |> Map.put(:sender_character, %Character{id: s_id, name: s_name})
    |> Map.put(:receiver_character, %Character{id: r_id, name: r_name})
  end

  defp remap_message(message) do
    message
    |> Map.put(:sender_character, nil)
    |> Map.put(:receiver_character, nil)
  end

  @spec get_user_messages(%User{}) :: [%Message{}]
  def get_user_messages(%{id: user_id}) do
    query =
      from m in Message,
        join: u in User,
        on: m.sender_user_id == u.id,
        left_join: cs in Character,
        on: m.sender_character_id == cs.id,
        left_join: cr in Character,
        on: m.receiver_character_id == cr.id,
        where: m.receiver_user_id == ^user_id,
        where: m.hide_for_receiver == false,
        order_by: [desc: m.inserted_at],
        select: %{%{%{m | sender_user: u} | sender_character: {
          cs.id,
          cs.name
        }} | receiver_character: {
          cr.id,
          cr.name
        }}

    Repo.all(query) |> Enum.map(&remap_message/1)
  end

  @spec get_sent_messages(%User{}) :: [%Message{}]
  def get_sent_messages(%{id: user_id}) do
    query =
      from m in Message,
        join: u in User,
        on: m.receiver_user_id == u.id,
        left_join: cs in Character,
        on: m.sender_character_id == cs.id,
        left_join: cr in Character,
        on: m.receiver_character_id == cr.id,
        where: m.sender_user_id == ^user_id,
        where: m.hide_for_sender == false,
        order_by: [desc: m.inserted_at],
        select: %{%{%{m | receiver_user: u} | sender_character: {
          cs.id,
          cs.name
        }} | receiver_character: {
          cr.id,
          cr.name
        }}

    Repo.all(query) |> Enum.map(&remap_message/1)
  end

  @spec message_digest(Integer.t()) :: MessageDigest.t()
  def message_digest(user_id) do
    query =
      from m in Message,
      where: m.receiver_user_id == ^user_id,
      where: m.hide_for_receiver == false

    case Repo.all(query) do
      []        ->
        %MessageDigest{total_messages: 0, unread_messages: 0}
      messages  ->
        %MessageDigest{
          total_messages: messages |> Enum.count(),
          unread_messages: messages |> Enum.count(fn
            %Message{read: false} -> true
            _                     -> false
          end)
        }
    end
  end

  @spec get_message(%User{}, String.t()) :: {:ok, %Message{}} | {:error, :not_found}
  def get_message(%{id: user_id}, message_id) do
    message =
      Message
      |> preload([:sender_user, :receiver_user, :sender_character, :receiver_character])
      |> Repo.get(message_id)

    case message do
      message = %{sender_user_id: ^user_id}   -> {:ok, message}
      message = %{receiver_user_id: ^user_id} -> {:ok, message}
      _ -> {:error, :not_found}
    end
  end

  def set_message_read(user, message_id) do
    with {:ok, message} <- get_message(user, message_id) do
      message
      |> Message.read_changeset(%{read: true})
      |> Repo.update()
    end
  end

  def delete_message(user = %{id: user_id}, message = %{id: message_id}) do
    attrs =
      case get_message(user, message_id) do
        {:ok, %{sender_user_id: ^user_id}}    -> %{hide_for_sender: true}
        {:ok, %{receiver_user_id: ^user_id}}  -> %{hide_for_receiver: true}
        _                                     -> %{}
      end

    message
    |> Message.hide_changeset(attrs)
    |> Repo.update()
  end

  def delete_all_received_messages(%{id: user_id}) do
    from(m in Message, where: m.receiver_user_id == ^user_id)
    |> Repo.update_all(set: [hide_for_receiver: true])

    :ok
  end

  def delete_all_sent_messages(%{id: user_id}) do
    from(m in Message, where: m.sender_user_id == ^user_id)
    |> Repo.update_all(set: [hide_for_sender: true])

    :ok
  end
end
