defmodule VtmAuth.Accounts.SessionInfo do
  defstruct map_id: 0, map_name: "", character_id: 0, approved: false, character_name: ""

  alias VtmAuth.Accounts.Session
  alias VtmAuth.Accounts.SessionInfo

  defp to_atom({key, value}) when is_binary(key), do: {String.to_atom(key), value}
  defp to_atom(k), do: k

  defp convert_keys(map) do
    map
    |> Map.new(&to_atom/1)
  end

  def extract_from_request(%{map_id: map_id, map_name: map_name}) do
    %SessionInfo{
      map_id: map_id,
      map_name: map_name
    }
  end

  def extract_from_request(%{
    character_id: id,
    character_name: name,
    approved: approved
  }) do
    %SessionInfo{
      character_id: id,
      character_name: name,
      approved: approved
    }
  end

  @spec extract_from_session(%Session{}) :: {:ok, %SessionInfo{}} | {:error, :not_found}
  def extract_from_session(%{session_info: session_info}) when not is_nil(session_info) do
    {:ok, struct(SessionInfo, session_info |> convert_keys())}
  end

  def extract_from_session(_) do
    {:error, :not_found}
  end
end
