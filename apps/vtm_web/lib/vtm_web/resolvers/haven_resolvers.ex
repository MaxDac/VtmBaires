defmodule VtmWeb.Resolvers.HavenResolvers do
  @moduledoc false

  import VtmWeb.Resolvers.Helpers

  alias Vtm.Havens
  alias Vtm.Havens.Event
  alias Vtm.Characters

  def get_havens(_, _, _) do
    result =
      Havens.get_havens()
      |> Enum.sort(fn
        %{x: _, y: ya}, %{x: _, y: yb} when ya != yb -> ya - yb >= 0
        %{x: xa, y: _}, %{x: xb, y: _} -> xa - xb >= 0
      end)

    {:ok, %{result: result}}
  end

  def set_haven_character(%{haven_id: haven_id, character_id: character_id}, _) do
    with {:ok, h_id}  <- parsed_id_to_integer?(haven_id),
         {:ok, c_id}  <- parsed_id_to_integer?(character_id) do
      Havens.set_haven_character(h_id, c_id)
    end
  end

  def delete_haven_character(%{haven_id: haven_id}, _) do
    with {:ok, h_id}  <- parsed_id_to_integer?(haven_id) do
      Havens.delete_character_from_haven(h_id)
    end
  end

  def get_unresolved_events(_, _, _) do
    {:ok, %{result: Havens.get_unresolved_events()}}
  end

  def get_character_domain_events(%{character_id: character_id}, _) do
    with {:ok, ch_id} <- parsed_id_to_integer?(character_id) do
      {:ok, %{result: Havens.get_character_domain_events(ch_id)}}
    end
  end

  @spec event_of_user?(non_neg_integer(), non_neg_integer()) :: boolean()
  defp event_of_user?(event_id, user_id) do
    case Havens.get_event_character(event_id) do
      nil         -> false
      %{id: c_id} -> Characters.character_of_user?(user_id, c_id)
    end
  end

  @spec map_event({:ok, Event.t()} | {:error, Ecto.Changeset.t()}) :: {:ok, map()} | {:error, Ecto.Changeset.t()}
  defp map_event({:ok, event}), do: {:ok, %{result: event}}
  defp map_event(e), do: e

  def resolve_event(%{event_id: event_id}, %{context: %{current_user: %{role: :master}}}) do
    with {:ok, e_id}  <- parsed_id_to_integer?(event_id),
         {:ok, event} <- Havens.resolve_event(e_id) do
      {:ok, %{result: event}}
    end
  end

  def resolve_event(%{event_id: event_id}, %{context: %{current_user: %{id: user_id}}}) do
    with {:ok, e_id} <- parsed_id_to_integer?(event_id) do
      case event_of_user?(e_id, user_id) do
        true  ->
          Havens.resolve_event(e_id)
          |> map_event()
        _     ->
          {:error, "Il personaggio non appartiene a questo utente"}
      end
    end
  end

end
