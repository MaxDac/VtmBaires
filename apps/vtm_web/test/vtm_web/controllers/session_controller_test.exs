defmodule VtmWeb.SessionControllerTest do
  use VtmWeb.ConnCase, async: true

  alias VtmAuth.Accounts
  alias VtmWeb.Authentication

  @ok_user %{
    "email" => "test@aaa.com",
    "name" => "John",
    "password" => "the_new_password",
    "role" => "PLAYER"
  }

  setup do
    with {:ok, user } <- Accounts.create_user(@ok_user) do
      %{ user: user }
    end
  end

  test "The login method correctly login with the right credentials", %{conn: conn, user: user} do
    conn = post(conn, Routes.session_path(conn, :create), @ok_user)

    assert %{ resp_cookies: %{
      "x-xcrf-cookie" => %{ value: token }
    } } = conn

    {:ok, data} = Authentication.verify(token)
    assert data.id == user.id
  end

  test "The login method doesn't allow access when given wrong credentials", %{conn: conn} do
    conn = post(conn, Routes.session_path(conn, :create), %{ @ok_user | "password" => "some_other_password" })

    assert %{ resp_cookies: %{} } = conn
  end

  test "The check logon method correctly returns the user when called", %{conn: conn, user: user} do
    conn = post(conn, Routes.session_path(conn, :create), @ok_user)

    assert %{ resp_cookies: %{
      "x-xcrf-cookie" => %{ value: token }
    } } = conn

    {:ok, data} = Authentication.verify(token)
    assert data.id == user.id
  end

  test "After a successful login, the subsequent request assigns the user to the connection", %{conn: conn, user: user} do
    conn = post(conn, Routes.session_path(conn, :create), @ok_user)

    assert %{ resp_cookies: %{
      "x-xcrf-cookie" => %{ value: token }
    } } = conn

    new_conn =
      build_conn()
      |> put_req_cookie("x-xcrf-cookie", token)
      |> post(Routes.session_path(conn, :check))

    assert %{
      "data" => %{
        "user" => %{
          "email" => new_email,
          "name" => new_name,
          "id" => new_id
        }
      }
    } = json_response(conn, 200)

    assert %{ assigns: %{ current_user: current_user } } = new_conn
    assert not is_nil(current_user)
    assert user.id == current_user.id

    assert new_email == user.email
    assert new_name == user.name
    assert new_id == to_string(user.id)

  end
end
