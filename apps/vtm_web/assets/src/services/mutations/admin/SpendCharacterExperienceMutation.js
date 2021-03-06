// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from "../../../_base/relay-utils";
import type {IEnvironment} from "relay-runtime";
import type {SpendCharacterExperienceInput} from "./__generated__/SpendCharacterExperienceMutation.graphql";
import type {Character} from "../../queries/character/GetCharacterCompleteQuery";

const mutation = graphql`
    mutation SpendCharacterExperienceMutation($input: SpendCharacterExperienceInput!) {
        spendCharacterExperience(input: $input) {
            result {
                id
                name
                experience
                totalExperience
            }
        }
    }
`;

const mutationPromise = (environment: IEnvironment, request: SpendCharacterExperienceInput): Promise<?Character> => {
    return wrapMutation<?Character>(environment, mutation, {
        input: request
    });
}

export default mutationPromise;
