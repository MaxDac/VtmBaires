// @flow

import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import createCharacter from "../../../services/mutations/characters/CreateCharacterMutation";
import {updateCurrentCharacter} from "../../../services/session-service";
import {Routes} from "../../../AppRouter";
import {UtilityContext} from "../../../contexts";
import {useRelayEnvironment} from "react-relay";
import MainLayout from "../../MainLayout";
import CharacterInfoForm, {CreationInfoFormValues} from "../controls/CharacterInfoForm";

const Creation1 = (): any => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const { showUserNotification } = useContext(UtilityContext);

    const onSubmit = (values: CreationInfoFormValues) => {
        createCharacter(environment, values)
            .then(response => {
                if (response?.createCharacter != null) {
                    updateCurrentCharacter({
                        id: response.createCharacter.id,
                        name: response.createCharacter.name ?? "No name available"
                    });
                }

                history.push(Routes.creation2);
            })
            .catch(e => showUserNotification({ type: 'error', graphqlError: e, message: "An error happened while creating the user." }));
    }

    return (
        <MainLayout>
            <CharacterInfoForm onSubmit={onSubmit} />
        </MainLayout>
    );
}

export default Creation1;
