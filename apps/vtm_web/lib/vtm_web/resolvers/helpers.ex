defmodule VtmWeb.Resolvers.Helpers do
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
end
