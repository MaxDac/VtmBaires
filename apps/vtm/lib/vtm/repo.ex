defmodule Vtm.Repo do
  use Ecto.Repo,
    otp_app: :vtm,
    adapter: Ecto.Adapters.Postgres
end
