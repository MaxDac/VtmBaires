defmodule VtmWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.
  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use VtmWeb, :controller
  require Logger

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(VtmWeb.ErrorView)
    |> render(:"401")
  end

  # This clause handles errors returned by Ecto's insert/update/delete.
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    Logger.error("An error happened with a changeset: #{inspect changeset}")

    conn
    |> put_status(:unprocessable_entity)
    |> put_view(VtmWeb.ErrorView)
    |> render("changeset-error.json", changeset: changeset)
  end

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(VtmWeb.ErrorView)
    |> render(:"404")
  end

  # GraphQL
  def call(conn, errors = %{errors: _}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(VtmWeb.ErrorView)
    |> render("graphql-errors.json", %{errors: errors})
  end

  def call(conn, _) do
    conn
    |> put_status(:internal_server_error)
    |> put_view(VtmWeb.ErrorView)
    |> render(:"500")
  end
end
