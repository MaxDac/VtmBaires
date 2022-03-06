// @flow

import graphql from 'babel-plugin-relay/macro';
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {
    AllUnapprovedCharactersQueryResponse,
    AllUnapprovedCharactersQueryVariables
} from "./__generated__/AllUnapprovedCharactersQuery.graphql";

export const allUnapprovedCharactersQuery: Query<AllUnapprovedCharactersQueryVariables, AllUnapprovedCharactersQueryResponse> = graphql`
    query AllUnapprovedCharactersQuery {
        unapprovedCharactersList {
            id
            name
        }
    }
`;
