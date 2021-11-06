// @flow

import type {Attribute, AttributeTypeNames} from "../services/queries/info/AttributesQuery";

export const sortStrings = (a: string, b: string): number =>
    a > b
        ? 1
        : (a === b ? 0 : -1);

const sortForAttributes = (a: Attribute, b: Attribute): number => sortStrings(a.id, b.id);

const sortForSkills = (a: Attribute, b: Attribute): number => {
    if (a?.name != null && b?.name != null) {
        return sortStrings(a.name, b.name);
    }

    return 0;
};

export type AttributeSorter = (Attribute, Attribute) => number;

export const getAttributeSectionOrder = (attributeSection: string): number => {
    switch (attributeSection) {
        case "Mental": return 3;
        case "Social": return 2;
        default: return 1;
    }
}

export const sortAttributesSection = (first: string, second: string): number => {
    const [firstOrder, secondOrder] = [getAttributeSectionOrder(first), getAttributeSectionOrder(second)];
    return firstOrder - secondOrder;
}

/**
 * Sorts the attributes.
 * @param attributeType: The attribute type name.
 * @return {(function(Attribute, Attribute): number)|*} The sorting function.
 */
export const sortAttributes = (attributeType: AttributeTypeNames): AttributeSorter =>
    (a: Attribute, b: Attribute): number => {
        if (a?.attributeType?.section != null &&
            b?.attributeType?.section != null &&
            a.attributeType.section !== b.attributeType.section) {
            return sortAttributesSection(a.attributeType.section, b.attributeType.section);
        }

        return attributeType === "Attribute"
            ? sortForAttributes(a, b)
            : sortForSkills(a, b);
    };
