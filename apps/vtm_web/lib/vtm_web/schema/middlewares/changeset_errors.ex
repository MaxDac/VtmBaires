defmodule VtmWeb.Schema.Middlewares.ChangesetErrors do
  @moduledoc false

  @behaviour Absinthe.Middleware

  def call(res, _) do
    with %{errors: [%Ecto.Changeset{} = changeset]} <- res do
      %{res | errors: transform_errors(changeset)}
    end
  end

  defp transform_errors(changeset) do
    changeset
    |> Ecto.Changeset.traverse_errors(&format_error/1)
    |> Enum.map(fn
      {key, value} -> "#{key}: #{value}"
    end)
  end

  defp format_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
