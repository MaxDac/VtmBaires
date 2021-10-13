defmodule VtmWeb.Resolvers.Helpers do
  import Absinthe.Relay.Node

  def parse_changeset_errors(%Ecto.Changeset{ errors: errors }, _) do
    errors
    |> Enum.map(fn
      {value, {error, _}} -> "#{value}: #{error}"
      _                   -> nil
    end)
    |> Enum.filter(fn x -> not is_nil(x) end)
  end

  def parse_changeset_errors(_, default) do
    [default]
  end

  @doc """
  Returns the insider_id from the global_id or nil
  """
  def from_global_id?(global_id) do
    with {:ok, %{id: new_id}}  <- global_id |> from_global_id(VtmWeb.Schema) do
      new_id |> String.to_integer()
    else
      _ -> nil
    end
  end
end
