defmodule Vtm.TemplateSeedsHelpers do
  import Ecto.Query
  alias Vtm.Repo
  require Logger

  def get_or_insert_template(attrs = %{name: name}) do
    query =
      from t in Vtm.Creation.Template,
        where: t.name == ^name

    case Repo.one(query) do
      nil ->
        %Vtm.Creation.Template{}
        |> Vtm.Creation.Template.changeset(attrs)
        |> Vtm.Repo.insert()
      template ->
        {:ok, template}
    end
  end

  def get_attribute_by_name(name) do
    query =
      from a in Vtm.Characters.Attribute,
        where: a.name == ^name

    Repo.one(query)
  end

  def insert_template_attr(attrs = %{template_id: t_id, attribute_name: a_name}) do
    %{id: a_id} =
      Vtm.Characters.Attribute
      |> Repo.get_by(name: a_name)

    case Vtm.Creation.TemplateAttribute |> Vtm.Repo.get_by(attribute_id: a_id, template_id: t_id) do
      nil ->
        attrs =
          attrs
          |> Map.put(:attribute_id, a_id)
          |> Map.drop([:attribute_name])

        %Vtm.Creation.TemplateAttribute{}
        |> Vtm.Creation.TemplateAttribute.changeset(attrs)
        |> Vtm.Repo.insert()
      a ->
        {:ok, a}
    end
  end
end

{:ok, %{id: scholar_id}} = Vtm.TemplateSeedsHelpers.get_or_insert_template(%{name: "Studioso", description: "Studioso"})

Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Forza", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Destrezza", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Costituzione", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Carisma", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Persuasione", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Autocontrollo", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Intelligenza", value: 4})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Prontezza", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Fermezza", value: 3})

Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Accademiche", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Tecnologia", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Espressività", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Furtività", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Occulto", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Scienza", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Intuito", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Convincere", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Sopravvivenza", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Investigazione", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Medicina", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Galateo", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Sotterfugio", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Guidare", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: scholar_id, attribute_name: "Armi da Fuoco", value: 1})

{:ok, %{id: fighter_id}} = Vtm.TemplateSeedsHelpers.get_or_insert_template(%{name: "Lottatore", description: "Lottatore"})

Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Forza", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Destrezza", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Costituzione", value: 4})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Carisma", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Persuasione", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Autocontrollo", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Intelligenza", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Prontezza", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Fermezza", value: 2})

Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Rissa", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Atletica", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Allerta", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Intimidire", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Sopravvivenza", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Armi da Fuoco", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Mischia", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Medicina", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Bassifondi", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Furtività", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Guidare", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Autorità", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Tecnologia", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Investigazione", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: fighter_id, attribute_name: "Intuito", value: 1})

{:ok, %{id: leader_id}} = Vtm.TemplateSeedsHelpers.get_or_insert_template(%{name: "Leader", description: "Leader"})

Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Forza", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Destrezza", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Costituzione", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Carisma", value: 4})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Persuasione", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Autocontrollo", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Intelligenza", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Prontezza", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Fermezza", value: 2})

Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Convincere", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Autorità", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Sotterfugio", value: 3})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Accademiche", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Espressività", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Galateo", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Politica", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Intimidire", value: 2})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Armi da Fuoco", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Tecnologia", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Guidare", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Sopravvivenza", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Intuito", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Allerta", value: 1})
Vtm.TemplateSeedsHelpers.insert_template_attr(%{template_id: leader_id, attribute_name: "Affinità Animale", value: 1})
