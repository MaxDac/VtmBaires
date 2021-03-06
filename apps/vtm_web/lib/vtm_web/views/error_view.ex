defmodule VtmWeb.ErrorView do
  use VtmWeb, :view

  def render("graphql-errors.json", %{errors: errors}) do
    errors
  end

  def render("changeset-error.json", %{changeset: %{errors: errors}}) do
    %{
      "errors" => errors |> Map.new(fn
        {message, {key, _}} -> {message, key}
      end)
    }
  end

  # If you want to customize a particular status code
  # for a certain format, you may uncomment below.
  # def render("500.json", _assigns) do
  #   %{errors: %{detail: "Internal Server Error"}}
  # end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.json" becomes
  # "Not Found".
  def template_not_found(template, _assigns) do
    %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  end
end
