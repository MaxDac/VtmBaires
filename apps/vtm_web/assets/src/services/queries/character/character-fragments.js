// @flow

import graphql from "babel-plugin-relay/macro";

export const characterInfoFragment: any = graphql`
    fragment characterFragments_characterInfo on Character {
        info {
            id
            name
            avatar
        }
    }
`;

export const characterStatsFragment: any = graphql`
    fragment characterFragments_characterStats on Character {
        clan {
            id
            name
        }
        humanity
    }
`;

export const characterSheetFragment: any = graphql`
    fragment characterFragments_characterSheet on Character {
        biography
        description
    }
`;

export const characterStateFragment: any = graphql`
    fragment characterFragments_characterState on Character {
        stage
        approved
        isComplete
        isNpc
    }
`;
