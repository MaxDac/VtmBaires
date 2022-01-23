// @flow

import graphql from "babel-plugin-relay/macro";
import type {Fragment} from "relay-runtime/util/RelayRuntimeTypes";
import type {CharacterFragments_characterInfo$fragmentType} from "./__generated__/CharacterFragments_characterInfo.graphql";
import type {CharacterFragments_characterConcealedInfo$fragmentType} from "./__generated__/CharacterFragments_characterConcealedInfo.graphql";
import type { CharacterFragments_characterStats$fragmentType } from "./__generated__/CharacterFragments_characterStats.graphql";
import type { CharacterFragments_characterSheet$fragmentType } from "./__generated__/CharacterFragments_characterSheet.graphql";
import type { CharacterFragments_characterState$fragmentType } from "./__generated__/CharacterFragments_characterState.graphql";
import type { CharacterFragments_characterOff$fragmentType } from "./__generated__/CharacterFragments_characterOff.graphql";

export const characterInfoFragment: Fragment<CharacterFragments_characterInfo$fragmentType> = graphql`
    fragment CharacterFragments_characterInfo on Character {
        id
        name
        isNpc
    }
`;

export const characterConcealedInfoFragment: Fragment<CharacterFragments_characterConcealedInfo$fragmentType> = graphql`
    fragment CharacterFragments_characterConcealedInfo on Character {
        id
        name
        biography
        disciplinePowers
        specialties
        objects
        clan {
            id
            name
        }
    }
`;

export const characterStatsFragment: Fragment<CharacterFragments_characterStats$fragmentType> = graphql`
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
        isAwake
        lastAwake
        lastHunt
        huntDifficulty
        lastResonance
        lastResonanceIntensity
    }
`;

export const characterSheetFragment: Fragment<CharacterFragments_characterSheet$fragmentType> = graphql`
    fragment CharacterFragments_characterSheet on Character {
        id
        avatar
        description
        isNpc
    }
`;

export const characterStateFragment: Fragment<CharacterFragments_characterState$fragmentType> = graphql`
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
        specialties
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
        huntDifficulty
    }
`;

export const characterOffFragment: Fragment<CharacterFragments_characterOff$fragmentType> = graphql`
    fragment CharacterFragments_characterOff on Character {
        id
        soundtrack
        off
    }
`;
