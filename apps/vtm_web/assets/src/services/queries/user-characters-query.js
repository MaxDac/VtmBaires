// @flow

import graphql from 'babel-plugin-relay/macro';
import { wrapQueryAuthorized } from "../relay-utils";
import type {CharacterInfo} from "./character/character-types";

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

export type CharacterListResponse = {
    me: {
        userCharacters: CharacterInfo[]
    }
};

const userCharactersQuery = (): Promise<CharacterListResponse> => wrapQueryAuthorized(query, {});

export default userCharactersQuery;
