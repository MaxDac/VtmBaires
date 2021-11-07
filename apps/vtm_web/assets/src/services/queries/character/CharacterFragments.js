// @flow

import graphql from "babel-plugin-relay/macro";

export const characterInfoFragment: any = graphql`
    fragment CharacterFragments_characterInfo on Character {
        id
        name
        clan {
            id
            name
        }
    }
`;

export const characterStatsFragment: any = graphql`
    fragment CharacterFragments_characterStats on Character {
        id
        clan {
            id
            name
        }
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
        lastHunt
        lastResonance
        lastResonanceIntensity
    }
`;

export const characterSheetFragment: any = graphql`
    fragment CharacterFragments_characterSheet on Character {
        id
        avatar
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
