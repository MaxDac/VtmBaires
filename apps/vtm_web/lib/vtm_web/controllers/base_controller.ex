defmodule VtmWeb.BaseController do
  use VtmWeb, :controller

  def index(conn, _params) do
    file = File.read!(Application.app_dir(:vtm_web, "priv/static/index.html"))

    conn
    |> put_resp_cookie("cache-control", "max-age=31536000")
    |> html(file)
  end
end
