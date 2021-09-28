defmodule Vtm.Messages do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Messages.Message
  alias Vtm.Characters.Character
  alias VtmAuth.Accounts.User

  alias Vtm.Characters

  import Vtm.Helpers

  defp aggregate_user_if_inexistent(attrs = %{
    receiver_user_id: nil,
    receiver_character_id: c_id
  }) when not is_nil(c_id) do
    case Characters.get_character_user(%{id: c_id}) do
      %{id: id} when not is_nil(id) -> attrs |> Map.put(:receiver_user_id, id)
      _                             -> attrs
    end
  end

  defp aggregate_user_if_inexistent(attrs) do
    IO.inspect attrs
    attrs
  end

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
        select: %{%{%{m | receiver_user: u} | sender_character: {
          cs.id,
          cs.name
        }} | receiver_character: {
          cr.id,
          cr.name
        }}

    Repo.all(query) |> Enum.map(&remap_message/1)
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
end
