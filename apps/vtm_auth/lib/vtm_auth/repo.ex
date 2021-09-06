defmodule VtmAuth.Repo do
  use Ecto.Repo,
    otp_app: :vtm_auth,
    adapter: Ecto.Adapters.Postgres
end
