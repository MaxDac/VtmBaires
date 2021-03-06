defmodule VtmWeb.Schema.Middlewares.Authorize do
  @moduledoc false

  @behaviour Absinthe.Middleware

  def call(resolution, role) do
    with %{current_user: current_user}  <- resolution.context,
         true                           <- correct_role?(current_user, role) do
      resolution
    else
      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "unauthorized"})
    end
  end

  defp correct_role?(%{}, :any), do: true
  defp correct_role?(%{role: :master}, _), do: true
  defp correct_role?(%{role: :player}, :player), do: true
  defp correct_role?(_, _), do: false
end
