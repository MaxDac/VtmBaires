defmodule VtmWeb.Schema.Middlewares.Login do
  @moduledoc false

  @behaviour Absinthe.Middleware

  def call(res, _) do
    with %{value: %{user: user}} <- res do
      %{res | context: Map.put(res.context, :current_user, user)}
    end
  end
end
