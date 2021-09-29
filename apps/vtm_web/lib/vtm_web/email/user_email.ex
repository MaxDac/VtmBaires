defmodule VtmWeb.UserEmail do
  import Swoosh.Email

  def welcome(user, email) do
    new()
    |> to({user, email})
    |> from({"VTM Baires Postmaster", "postmaster@vtmbaires.eu"})
    |> subject("Welcome to VTM Baires!")
    |> html_body("<h1>Welcome!</h1>")
    |> text_body("Hello!")
  end
end
