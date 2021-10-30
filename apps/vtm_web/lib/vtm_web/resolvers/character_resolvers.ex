defmodule VtmWeb.Resolvers.CharacterResolvers do
  @moduledoc """
  Resolvers for chat
  """

  import VtmWeb.Resolvers.Helpers

  alias Vtm.Characters
  alias Vtm.Creation

  alias Vtm.Characters.Character
  alias Vtm.Messages
  alias VtmAuth.Accounts
  alias VtmAuth.Accounts.SessionInfo

  def all(_, _, _) do
    {:ok, Characters.all()}
  end

  def all_unapproved(_, _, _) do
    {:ok, Characters.all_unapproved()}
  end

  def get_clans(_, _, _) do
    {:ok, Characters.get_clans()}
  end

  def get_predator_types(_, _, _) do
    {:ok, Characters.get_predator_types()}
  end

  def get_attributes(_, _, _) do
    {:ok, Characters.get_attributes()}
  end

  def get_clan_disciplines(%{clan_id: clan_id}, _) do
    {:ok, Characters.get_clan_disciplines(clan_id)}
  end

  def get_user_characters(user, _, _) do
    case Characters.get_user_characters(user) do
      characters when not is_nil(characters) ->
        {:ok, characters}
      _ ->
        {:ok, []}
    end
  end

  @spec get_character(%{id: integer}, map) :: {:ok, map} | {:error, binary}
  def get_character(%{id: id}, %{context: %{current_user: user}}) do
    case Characters.get_specific_character(user, id) do
      character when not is_nil(character) ->
        {:ok, character |> map_character()}
      _ ->
        {:error, "The user does not exist, or you have no permission to see it."}
    end
  end

  def get_character_avatar(%{character_id: c_id}, _) do
    result =
      [c_id |> String.to_integer()]
      |> Characters.get_characters_avatar()

    case result do
      [c] ->
        {:ok, c}
      _   ->
        {:error, :not_found}
    end
  end

  def get_characters_avatar(_, %{character_ids: c_ids}, _) do
    # Characters and their avatars are represented as different objects for relay.
    # For this, the response must be sent as character and avatar as different objects.
    result =
      c_ids
      |> from_global_ids()
      |> Characters.get_characters_avatar()
      |> Enum.map(fn
        %Character{id: id, avatar: avatar} ->
          %{
            character: %{id: id},
            avatar: %{id: id, avatar: avatar}
          }
      end)

    {:ok, result}
  end

  def get_character_chat_avatar(%{character_id: c_id}, _) do
    result =
      [c_id |> String.to_integer()]
      |> Characters.get_characters_chat_avatar()

    case result do
      [c] ->
        {:ok, c}
      _   ->
        {:error, :not_found}
    end
  end

  def get_characters_chat_avatar(_, %{character_ids: c_ids}, _) do
    # Characters and their avatars are represented as different objects for relay.
    # For this, the response must be sent as character and avatar as different objects.
    {:ok, c_ids
      |> from_global_ids()
      |> Characters.get_characters_chat_avatar()
      |> Enum.map(fn
        %Character{id: id, chat_avatar: avatar} ->
          %{
            character: %{id: id},
            chat_avatar: %{id: id, chat_avatar: avatar}
          }
      end)}
  end

  def get_character_stats(%{character_id: id }, %{context: %{current_user: user}}) do
    with %{id: character_id}  <- Characters.get_specific_character(user, id),
         stats                <- Characters.get_character_stats(character_id) do
      {:ok, stats}
    else
      _ ->
        {:error, "The user does not exist, or you have no permission to see it."}
    end
  end

  def get_session_character(_, _, %{context: %{current_user: user}}) do
    with {:ok, %SessionInfo{
      character_id: id,
      character_name: name,
      approved: approved
    }} <- Accounts.get_character_session_by_user_id(user.id) do
      {:ok, %{
        id: id,
        name: name,
        approved: approved
      }}
    end
  end

  def create_character(_, %{request: request = %{clan_id: clan_id}}, %{context: %{current_user: current_user}}) do
    get_new_request =
      fn clan_id ->
        request
        |> Map.put(:clan_id, clan_id)
        |> Map.put(:user_id, current_user.id)
      end

    with {:ok, c_id}                            <- from_global_id?(clan_id),
         new_request                            <- get_new_request.(c_id),
         :ok                                    <- Characters.user_has_characters?(current_user.id),
         {:ok, %Character{id: id, name: name}}  <- Characters.create(new_request, current_user),
         {:ok, _}                               <- VtmAuth.Accounts.update_session_dynamic_field(current_user, %{
           character_id: id,
           character_name: name,
           approved: false
         }) do
      {:ok, %{
        id: id,
        name: name
      }}
    end
  end

  defp map_character(character) do
    character
    |> Map.put(:info, %{
      id: character.id,
      name: character.name,
      avatar: character.avatar,
      chat_avatar: character.chat_avatar
    })
  end

  @spec parse_attribute_query(%{
          :attribute_id => binary,
          :character_id => any,
          optional(any) => any
        }) ::
          {:error, binary}
          | {:ok, %{:attribute_id => integer, :character_id => integer, optional(any) => any}}
  def parse_attribute_query(request = %{attribute_id: id, character_id: char_id}) do
    with {:ok, a_id}  <- from_global_id?(id),
         {:ok, c_id}  <- from_global_id?(char_id) do
      {:ok,
        request
        |> Map.put(:attribute_id, a_id)
        |> Map.put(:character_id, c_id)}
    end
  end

  def append_attributes(_, %{request: request, new_stage: new_stage}, context = %{context: %{current_user: %{id: user_id}}}) do
    new_request =
      request
      |> Enum.map(&parse_attribute_query/1)
      |> reduce_error_list()

    with {:ok, new_req}             <- new_request,
         {:ok, %{id: character_id}} <- Creation.update_character_stage(user_id, new_stage, new_req) do
      get_character(%{id: character_id}, context)
    end
  end

  def get_creation_templates(_, _, _) do
    {:ok, Creation.get_templates()}
  end

  def apply_template_to_character(_,
    %{character_id: character_id, template_id: template_id},
    %{context: %{current_user: %{id: user_id}}}) do

    with {:ok, c_id}  <- from_global_id?(character_id),
         {:ok, t_id}  <- from_global_id?(template_id) do

      case Characters.character_of_user?(user_id, c_id) do
        true ->
          Creation.apply_template_to_character(c_id, t_id)
        _ ->
          {:error, "The character does not belong to the user"}
      end

    end
  end

  defp map_global_id_attributes(request) do
    parsed_request =
      request
      |> Enum.map(fn {k, v} -> {k, from_global_id?(v)} end)
      |> Enum.reduce({:ok, %{}}, fn
        {k, {:ok, v}}, {:ok, m}         -> {:ok, m |> Map.put(k, v)}
        {_, {:error, e}}, {:ok, _}      -> {:error, [e]}
        {_, {:ok, _}}, e                -> e
        {_, {:error, e}}, {:error, ee}  -> {:error, [e | ee]}
      end)

    with {:ok, ls}  <- parsed_request do
      {:ok, ls |> Map.new()}
    end
  end

  def switch_attributes(_, request = %{character_id: id}, context = %{context: %{current_user: %{id: user_id}}}) do
    with {:ok, parsed_id}   <- from_global_id?(id),
         true               <- Characters.character_of_user?(user_id, parsed_id),
         {:ok, new_request} <- map_global_id_attributes(request),
         {:ok, _}           <- Creation.switch_attributes(new_request) do
      get_character(%{id: parsed_id}, context)
    else
      false ->
        {:error, :unauthorized}
      e ->
        e
    end
  end

  defp add_human_advantages(character_id, %{request: request, new_stage: new_stage}, context = %{context: %{current_user: %{id: user_id}}}) do
    new_request =
      request
      |> Map.put(:id, character_id)

    with {:ok, _} <- Creation.add_human_advantages(user_id, new_request),
         {:ok, _} <- Creation.update_character_stage_non_vampires(user_id, new_stage, character_id, request) do
      get_character(%{id: character_id}, context)
    end
  end

  defp add_thin_blood_advantages(character_id, %{request: request, new_stage: new_stage}, context = %{context: %{current_user: %{id: user_id}}}) do
    new_request = fn p_id ->
      request
      |> Map.put(:predator_type_id, p_id)
      |> Map.put(:id, character_id)
    end

    with {:ok, p_id}  <- from_global_id?(request.predator_type_id),
         new_req      <- new_request.(p_id),
         {:ok, _}     <- Creation.add_advantages(user_id, new_req),
         {:ok, _}     <- Creation.update_character_stage_non_vampires(user_id, new_stage, character_id, new_req) do
      get_character(%{id: character_id}, context)
    end

  end

  defp add_vampire_advantages(%{request: request, attributes: attributes, new_stage: new_stage}, context = %{context: %{current_user: %{id: user_id}}}) do
    new_attributes =
      attributes
      |> Enum.map(&parse_attribute_query/1)
      |> reduce_error_list()

    new_request = fn
      [first_attribute | _], p_id ->
        request
        |> Map.put(:predator_type_id, p_id)
        |> Map.put(:id, first_attribute.character_id)
    end

    with {:ok, new_attrs} <- new_attributes,
         {:ok, p_id}      <- from_global_id?(request.predator_type_id),
         new_req          <- new_request.(new_attrs, p_id),
         {:ok, _}         <- Creation.add_advantages(user_id, new_req),
         {:ok, character} <- Creation.update_character_stage(user_id, new_stage, new_attrs) do
      get_character(character, context)
    end
  end

  def add_advantages(request = %{character_id: char_id}, context) do
    character_id = char_id |> String.to_integer()

    case {Characters.is_character_human?(character_id), Characters.is_character_thin_blood?(character_id)} do
      {true, false} ->
        add_human_advantages(character_id, request, context)
      {false, true} ->
        add_thin_blood_advantages(character_id, request, context)
      _ ->
        add_vampire_advantages(request, context)
    end
  end

  def finalize_character(%{character_id: character_id}, context = %{context: %{current_user: %{id: user_id}}}) do
    with {:ok, _} <- Creation.complete_character(user_id, character_id) do
      get_character(%{id: character_id}, context)
    end
  end

  def delete_character(%{character_id: character_id}, %{context: %{current_user: user}}) do
    with {:ok, _} <- Characters.delete_character(character_id, user),
         {:ok, _} <- Accounts.update_session_dynamic_field(user) do
      {:ok, true}
    end
  end

  def approve_character(%{character_id: character_id, reason: reason}, _) do
    subject = "Accettazione personaggio"

    default_message =
      """
      Complimenti! Il tuo utente è stato accettato. Puoi cominciare a giocare e partecipare attivamente alle giocate.\n
      \n
      Se hai ricevuto questo messaggio mentre eri loggato, per rendere effettive le modifiche dovrai disconnetterti
      e riconnetterti successivamente.
      """

    message =
      case reason do
        ""  ->
          default_message
        nil ->
          default_message
        _   ->
          """
          #{default_message}\n\nIl narratore che ha accettato il tuo personaggio ha voluto aggiungere qualcosa:\n
          \n
          #{reason}
          """
      end

    with {:ok, character} <- Characters.approve_character(character_id),
         %{id: id}        <- Characters.get_character_user(character),
         {:ok, message}   <- Messages.send_master_message(id, subject, message),
         _                <- Absinthe.Subscription.publish(VtmWeb.Endpoint, message, new_message_notification: id) do
      {:ok, true}
    end
  end

  def reject_character(%{character_id: character_id, reason: reason}, %{context: %{current_user: user = %{id: user_id}}}) do
    user_name = VtmAuth.Accounts.get_user_name_by_id(user_id)

    subject = "Personaggio rifiutato!"
    message =
      """
      Ci dispiace informarti che il tuo utente è stato stato rifiutato. La ragione è stata la seguente\n
      \n
      #{reason}\n
      \n
      La decisione è stata presa da #{user_name}.
      """

    with %{id: id}      <- Characters.get_character_user(%{id: character_id}),
         {:ok, _}       <- Characters.delete_character(character_id, user),
         {:ok, message} <- Messages.send_master_message(id, subject, message),
         _              <- Absinthe.Subscription.publish(VtmWeb.Endpoint, message, new_message_notification: id) do
      {:ok, true}
    else
      e ->
        IO.puts "error while rejecting: #{inspect e}"
        e
    end
  end

  def change_sheet_info(%{character_id: character_id, request: request}, _) do
    Characters.change_sheet_info(character_id, request)
  end

  def change_character_attribute(%{character_id: character_id, attribute_id: attribute_id, new_value: new_value}, _) do
    with [c_id, a_id] <- [character_id, attribute_id] |> Enum.map(&String.to_integer/1),
         {:ok, _} <- Characters.change_character_attribute(c_id, a_id, new_value) do
      {:ok, %{result: true}}
    end
  end

  def update_character(attrs = %{character_id: character_id, predator_type_id: predator_type_id}, _) do
    new_attrs =
      attrs
      |> Map.drop([:character_id])
      |> Map.put(:predator_type_id, predator_type_id |> String.to_integer())

    character_id
    |> String.to_integer()
    |> Characters.update_character(new_attrs)
  end

  def update_character(attrs = %{character_id: character_id}, _) do
    character_id
    |> String.to_integer()
    |> Characters.update_character(attrs |> Map.drop([:character_id]))
  end

  def update_character_experience(%{character_id: character_id, experience_change: exp}, %{context: %{current_user: user}}) do
    case Characters.get_specific_character(user, character_id |> String.to_integer()) do
      nil ->
        {:error, :not_found}
      %{id: id, experience: current_exp} when current_exp + exp >= 0 ->
        id
        |> Characters.update_character(%{experience: current_exp + exp})
      _ ->
        {:error, "Not enough experience"}
    end
  end
end
