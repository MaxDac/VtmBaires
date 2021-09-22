defmodule VtmWeb.SessionView do
  use VtmWeb, :view

  def render("ok.json", %{user: user, session: %{session_info: %{
    character_id: character_id,
    character_name: character_name
  }}}) do
    %{
      data: %{
        user: %{
          id: user["id"],
          name: user["name"],
          email: user["email"],
          role: user["role"]
        },
        session: %{
          "characterId" => character_id,
          "characterName" => character_name
        }
      }
    }
  end

  def render("ok-keys.json", %{user: user}) do
    %{
      data: %{
        user: user
      }
    }
  end

  def render("logout-ok.json", _) do
    %{}
  end

  def render("not-ok.json", _) do
    %{
      errors: [
        %{
          message: "Not authorized"
        }
      ]
    }
  end
end
