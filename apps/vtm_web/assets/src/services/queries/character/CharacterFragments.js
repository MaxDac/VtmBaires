// @flow

import graphql from "babel-plugin-relay/macro";

export const characterInfoFragment: any = graphql`
    fragment CharacterFragments_characterInfo on Character {
        id
        name
        chatAvatar
        clan {
            id
            name
        }
    }
`;

export const characterAvatarsFragment: any = graphql`
    fragment CharacterFragments_characterAvatar on Character {
        avatar
    }
`;

export const characterStatsFragment: any = graphql`
    fragment CharacterFragments_characterStats on Character {
        id
        humanity
        experience
        generation
        hunger
        health
        damage
        aggravatedDamage
        willpower
        willpowerDamage
        stains
        bloodPotency
    }
`;

export const characterSheetFragment: any = graphql`
    fragment CharacterFragments_characterSheet on Character {
        id
        biography
        description
    }
`;

export const characterStateFragment: any = graphql`
    fragment CharacterFragments_characterState on Character {
        id
        stage
        approved
        isComplete
        isNpc
        experience
        advantages
        notes
        predatorType {
            id
            name
        }
    }
`;
