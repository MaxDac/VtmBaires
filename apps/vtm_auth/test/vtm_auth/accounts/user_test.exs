defmodule VtmAuth.UserTest do
  @moduledoc false

  use VtmAuth.DataCase

  alias VtmAuth.Accounts
  alias VtmAuth.Accounts.User

  @ok_user %{"email" => "test@aaa.com", "name" => "John", "password" => "the_new_password", "role" => "player"}
  @invalid_user %{"email" => "test@aaa.com", "password" => "the_new_password", "role" => "player"}

  describe "create_new" do
    test "creates a new user" do
      {:ok, user} = Accounts.create_user(@ok_user)
      assert {:ok, _} = Accounts.get_user(user.id)
    end

    test "does not create a new user with invalid data" do
      assert {:error, error} = Accounts.create_user(@invalid_user)
      assert %{errors: [name: {"can't be blank", _}]} = error
    end
  end

  describe "list_users" do
    test "returns an empty list without user" do
      assert [] == Accounts.list_users()
    end

    test "list all the users" do
      {:ok, _} = Accounts.create_user(@ok_user)
      users = Accounts.list_users()
      assert 1 == users |> Enum.count()
      assert [%User{name: name}] = users
      assert name == @ok_user["name"]
    end
  end

  describe "update_user" do
    test "correctly update the user with the new email" do
      new_email = "bbb@test.com"
      {:ok, user} = Accounts.create_user(@ok_user)
      assert {:ok, user} = Accounts.update_user(user, %{"email" => new_email})
      assert user.email == new_email
    end
  end

  describe "session" do
    test "lists the current session" do
      {:ok, user} = Accounts.create_user(@ok_user)
      {:ok, _} = Accounts.update_session(user)

      sessions = Accounts.get_current_sessions()

      assert sessions |> Enum.count() == 1
    end
  end

  describe "authenticate" do
    test "authenticates an existing user that gives the correct password" do
      %{
        "role"      => role,
        "email"     => email,
        "password"  => password
      } = @ok_user

      {:ok, _} = Accounts.create_user(@ok_user)
      assert {:ok, _} = Accounts.authenticate(role, email, password)
    end

    test "disallows an existing user that gives the wrong password" do
      %{
        "role"      => role,
        "email"     => email
      } = @ok_user

      {:ok, _} = Accounts.create_user(@ok_user)
      assert {:error, :unauthorized} = Accounts.authenticate(role, email, "some_other_password")
    end

    test "disallows a non existing user" do
      %{"role" => role} = @ok_user
      {:ok, _} = Accounts.create_user(@ok_user)
      assert {:error, :unauthorized} = Accounts.authenticate(role, "some@email.com", "some_other_password")
    end

    test "creates a new session for the user" do
      %{
        "role"      => role,
        "email"     => email,
        "password"  => password
      } = @ok_user

      {:ok, _} = Accounts.create_user(@ok_user)
      assert {:ok, _} = Accounts.authenticate(role, email, password)

      user_session = Accounts.list_users()
      assert user_session |> Enum.count() == 1
    end
  end
end
