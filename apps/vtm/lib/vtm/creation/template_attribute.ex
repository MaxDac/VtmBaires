defmodule Vtm.Creation.TemplateAttribute do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Creation.Template
  alias Vtm.Characters.Attribute

  @type t :: %__MODULE__{
    value: non_neg_integer(),
    template_id: non_neg_integer(),
    template: Template.t(),
    attribute_id: non_neg_integer(),
    attribute: Attribute.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "creation_template_attrs" do
    field :value, :integer

    belongs_to :template, Template
    belongs_to :attribute, Attribute

    timestamps()
  end

  @doc false
  def changeset(template_attribute, attrs) do
    template_attribute
    |> cast(attrs, [:value, :template_id, :attribute_id])
    |> foreign_key_constraint(:template_id)
    |> foreign_key_constraint(:attribute_id)
    |> unique_constraint([:template_id, :attribute_id], name: :creation_templates_attrs_set_uk)
    |> validate_required([:value, :template_id, :attribute_id])
  end
end
