defmodule VtmWeb.Resolver.Authentication.Test do
  use VtmWeb.ConnCase, async: true

  import Plug.Conn

  alias VtmAuth.Accounts

  alias VtmWeb.Authentication
  alias VtmWeb.Resolvers.AccountsResolvers

  @ok_user %{
    "email" => "test@aaa.com",
    "name" => "John",
    "password" => "the_new_password",
    "role" => "player"
  }

  setup do
    with {:ok, user} <- Accounts.create_user(@ok_user) do
      %{user: user}
    end
  end

  test "authentication generates a valid token after a successful authentication" do
    token = Authentication.sign_token(@ok_user)
    {:ok, user} = Authentication.verify(token)
    assert user == @ok_user
  end

  test "authentication resolution correctly returns a token", %{user: user} do
    %{
      "role" => role,
      "email" => email,
      "password" => password
    } = @ok_user

    assert {:ok, %{token: token, user: logged_user}} = AccountsResolvers.login(%{}, %{
      role: role, email: email, password: password
    }, %{})

    assert token != nil
    assert token != ""
    assert logged_user.id == user.id
  end

  defp put_req_cookie_test(conn, cookie_key, cookie_value) do
    conn = conn |> fetch_cookies()
    %{conn | req_cookies: %{cookie_key => cookie_value}}
  end

  test "The get_cookie method gets the cookie when it exists" do
    conn = build_conn() |> put_req_cookie_test("some-cookie", "some-value")
    cookie_value = conn |> Authentication.get_cookie("some-cookie")
    assert {:ok, "some-value"} == cookie_value
  end

  test "The get_cookie method doesn't get the cookie when it doesn't exists" do
    conn = build_conn()
    cookie_value = conn |> Authentication.get_cookie("some-cookie")
    assert {:error, :not_found} == cookie_value
  end

  test "The method check_request_cookie correctly identify the generated user", %{user: user} do
    %{
      "role" => role,
      "email" => email,
      "password" => password
    } = @ok_user

    assert {:ok, %{token: token, user: _} } = AccountsResolvers.login(%{}, %{
      role: role, email: email, password: password
    }, %{})

    conn = build_conn() |> put_req_cookie_test("x-xcrf-cookie", token)
    assert {:ok, token_user} = Authentication.check_request_cookie(conn)
    assert user.id == token_user.id
  end
end
