// @flow

import graphql from "babel-plugin-relay/macro";

export const characterInfoFragment: any = graphql`
    fragment CharacterFragments_characterInfo on Character {
        id
        name
        isNpc
    }
`;

export const characterConcealedInfoFragment: any = graphql`
    fragment CharacterFragments_characterConcealedInfo on Character {
        id
        name
        biography
        disciplinePowers
        objects
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
        totalExperience
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
        description
        isNpc
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
        totalExperience
        biography
        advantages
        notes
        disciplinePowers
        convictions
        objects
        predatorType {
            id
            name
        }
        clan {
            id
            name
        }
    }
`;

export const characterOffFragment: any = graphql`
    fragment CharacterFragments_characterOff on Character {
        id
        soundtrack
        off
    }
`;
