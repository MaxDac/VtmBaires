defmodule Vtm.Creation do
  import Ecto.Query, warn: false

  alias Vtm.Repo

  alias Vtm.Creation.Template
  alias Vtm.Creation.TemplateAttribute

  def get_templates() do
    Template
    |> Repo.all()
  end

  def apply_template_to_character(character_id, template_id) do
    
  end

end
