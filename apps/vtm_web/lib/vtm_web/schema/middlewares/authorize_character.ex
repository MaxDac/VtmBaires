defmodule VtmWeb.Schema.Middlewares.AuthorizeCharacter do
  @moduledoc false

  @behaviour Absinthe.Middleware

  alias Vtm.Characters
  import VtmWeb.Resolvers.Helpers

  def call(resolution = %{arguments: %{entry: request}}, _) do
    with %{current_user: current_user}  <- resolution.context,
         true                           <- correct_user_for_character?(current_user, request) do
      resolution
    else
      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "unauthorized"})
    end
  end

  defp correct_user_for_character?(%{role: :master}, _), do: true

  defp correct_user_for_character?(%{id: user_id}, %{character_id: character_id}) do
    with {:ok, c_id}  <- from_global_id?(character_id) do
      Characters.character_of_user?(user_id, c_id)
    end
  end
end
