// @flow

import graphql from 'babel-plugin-relay/macro';
import type {GraphQLTaggedNode} from "relay-runtime";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetCharacterStatsQuery} from "./__generated__/GetCharacterStatsQuery.graphql";

export const getCharacterStatsQuery: GraphQLTaggedNode = graphql`
    query GetCharacterStatsQuery($id: ID!) {
        getCharacterStats(characterId: $id) {
            id
            attributes {
                id
                value
                attribute {
                    name
                    attributeType {
                        name
                        section
                    }
                }
            }
            disciplines {
                id
                value
                attribute {
                    name
                }
            }
            advantages {
                id
                value
                attribute {
                    name
                }
            }
            predatorType {
                id
                name
                description
            }
        }
    }
`;

export type Stat = {
    id: ?string;
    name: ?string;
    value: ?number;
    maxValue?: number;
};

export type Attribute = Stat & {
    type: ?string;
    section: ?string;
};

export type Discipline = Stat;

export type Advantage = Stat;

export type PredatorType = {
    name: ?string;
    description: ?string;
};

export type CharacterStats = {|
    characterId: string;
    attributes: Array<Attribute>;
    disciplines: Array<Discipline>;
    advantages: Array<Advantage>;
    predatorType: PredatorType
|};

export const useCharacterStatsQuery = (characterId: string, queryOptions?: any): ?CharacterStats => {
    const s =
        useCustomLazyLoadQuery<GetCharacterStatsQuery>(getCharacterStatsQuery, {id: characterId}, queryOptions)
            ?.getCharacterStats;

    if (s?.id != null) {
        return ({
            characterId: s.id,
            attributes: s?.attributes
                ?.map(a => ({
                    id: a?.id,
                    name: a?.attribute?.name,
                    type: a?.attribute?.attributeType?.name,
                    section: a?.attribute?.attributeType?.section,
                    value: a?.value
                })) ?? [],
            disciplines: s?.disciplines?.map(a => ({
                id: a?.id,
                name: a?.attribute?.name,
                value: a?.value
            })) ?? [],
            advantages: s?.advantages?.map(a => ({
                id: a?.id,
                name: a?.attribute?.name,
                value: a?.value
            })),
            predatorType: {
                id: s?.predatorType?.id,
                name: s?.predatorType?.name,
                description: s?.predatorType?.description
            }
        });
    }

    return null;
}
