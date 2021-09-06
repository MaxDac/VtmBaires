defmodule VtmWeb.Schema.Mutations.LoginSchemaTest do
  use VtmWeb.ConnCase, async: true

  alias VtmAuth.Accounts

  @ok_user %{
    "email" => "test@aaa.com",
    "name" => "John",
    "password" => "the_new_password",
    "role" => "player"
  }

  setup do
    with {:ok, user } <- Accounts.create_user(@ok_user) do
      %{ user: user }
    end
  end

  @query """
  mutation ($email: String!, $password: String!) {
    login(role: PLAYER, email: $email, password: $password) {
      token
      user {
        id
        email
        name
        __typename
      }
    }
  }
  """
  test "login succeed and creates a session when the right credentials are passed", %{user: user} do
    response =
      build_conn()
      |> post("/api", %{
        query: @query,
        variables: @ok_user
      })

    assert %{"data" => %{
      "login" => %{
        "token" => token,
        "user" => %{
          "id" => user_id,
          "email" => user_email,
          "name" => user_name
        }
      }
    }} = json_response(response, 200)

    assert user_name == user.name
    assert user_id == to_string(user.id)
    assert user_email == user.email

    assert not is_nil(token)

  end

  @query """
  mutation ($email: String!, $password: String!) {
    login(role: PLAYER, email: $email, password: $password) {
      token
      user {
        id
        email
        name
        __typename
      }
    }
  }
  """
  test "login fails when the wrong credentials are passed" do
    response =
      build_conn()
      |> post("/api", %{
        query: @query,
        variables: %{ @ok_user | "password" => "some_other_password" }
      })

    assert %{
      "data" => %{
        "login" => nil
      },
      "errors" => [
        %{
          "message" => "incorrect username or password",
          "path" => [ "login" ]
        }
      ]
    } = json_response(response, 200)
  end

  @query """
  mutation ($email: String!, $password: String!) {
    login(role: MASTER, email: $email, password: $password) {
      token
      user {
        id
        email
        name
        __typename
      }
    }
  }
  """
  test "login fails when the right credentials are passed but with wrong role" do
    response =
      build_conn()
      |> post("/api", %{
        query: @query,
        variables: @ok_user
      })

    assert %{
      "data" => %{
        "login" => nil
      },
      "errors" => [
        %{
          "message" => "incorrect username or password",
          "path" => [ "login" ]
        }
      ]
    } = json_response(response, 200)
  end
end
