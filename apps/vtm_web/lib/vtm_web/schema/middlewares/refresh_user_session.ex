defmodule VtmWeb.Schema.Middlewares.RefreshUserSession do
  @moduledoc false

  @behaviour Absinthe.Middleware

  alias VtmAuth.Accounts
  require Logger

  def call(resolution = %{context: %{current_user: user}}, _) do
    update_character_session(user)

    # Will not block the call if the session cannot be upgraded
    resolution
  end

  defp update_character_session(user) do
    Task.start(fn ->
      case Accounts.update_session(user) do
        result = {:ok, _} -> result
        e                 -> Logger.error("Error while updating the session user for #{inspect user}: #{inspect e}")
      end
    end)
  end
end
