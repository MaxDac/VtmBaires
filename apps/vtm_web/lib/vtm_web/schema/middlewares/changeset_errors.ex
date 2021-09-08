defmodule VtmWeb.Schema.Middlewares.ChangesetErrors do
  @behaviour Absinthe.Middleware

  def call(res, _) do
    with %{errors: [%Ecto.Changeset{} = changeset]} <- res do
      %{ res | errors: transform_errors(changeset) }
    end
  end

  defp transform_errors(changeset) do
    res = changeset
    |> Ecto.Changeset.traverse_errors(&format_error/1)
    |> Enum.map(fn
      {key, value} -> "#{key}: #{value}"
    end)

    IO.inspect res

    res
  end

  defp format_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
