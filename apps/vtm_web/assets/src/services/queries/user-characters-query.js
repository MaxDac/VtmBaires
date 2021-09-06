// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapQueryAuthorized } from "../relay-utils";

const query = graphql`
    query userCharactersQuery {
        me {
            userCharacters {
                id
                name
                avatar
            }
        }
    }
`;

export type Character = {
    id: string;
    name: string;
    avatar: string;
};

export type CharacterListResponse = {
    me: {
        userCharacters: Character[]
    }
};

const userCharactersQuery = (): Promise<CharacterListResponse> => wrapQueryAuthorized(query, {});

export default userCharactersQuery;
