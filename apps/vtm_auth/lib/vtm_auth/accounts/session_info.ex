defmodule VtmAuth.Accounts.SessionInfo do
  defstruct map_id: 0, character_id: 0, character_name: ""

  alias VtmAuth.Accounts.Session
  alias VtmAuth.Accounts.SessionInfo

  @spec extract_from_session(%Session{}) :: %SessionInfo{}
  def extract_from_session(%{session_info: session_info}) do
    struct(SessionInfo, session_info)
  end
end
