defmodule VtmWeb.Schema.Mutations.AccountSchemaTest do
  use VtmWeb.ConnCase, async: true

  alias VtmAuth.Accounts

  @ok_user %{
    "email" => "test@aaa.com",
    "name" => "John",
    "password" => "the_new_password",
    "role" => "player"
  }

  @query """
  mutation createUserMutation($email: String!, $password: String!, $name: String!) {
      create(email: $email, password: $password, name: $name) {
          id
      }
  }
  """
  test "create user mutation creates a user" do
    response =
      build_conn()
      |> post("/api", %{
        query: @query,
        variables: @ok_user
      })

    assert %{
      "data" => %{
        "create" => %{
          "id" => id
        }
      }
    } = json_response(response, 200)

    {:ok, user} = Accounts.get_user(id)

    assert user.name == @ok_user["name"]
  end

  @query """
  mutation createUserMutation($email: String!, $password: String!, $name: String!) {
      create(email: $email, password: $password, name: $name) {
          id
      }
  }
  """
  test "create user mutation creates only a user with same email and name" do
    build_conn()
      |> post("/api", %{
        query: @query,
        variables: @ok_user
      })

    response =
      build_conn()
      |> post("/api", %{
        query: @query,
        variables: @ok_user
      })

    assert %{
      "data" => %{
        "create" => nil
      },
      "errors" => [
        %{
          "message" => message
        }
      ]
    } = json_response(response, 200)

    assert "email: has already been taken" == message
  end
end
