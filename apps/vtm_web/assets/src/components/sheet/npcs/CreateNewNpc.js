// @flow

import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {updateCurrentCharacter} from "../../../services/session-service";
import {Routes} from "../../../AppRouter";
import {UtilityContext} from "../../../contexts";
import {useRelayEnvironment} from "react-relay";
import MainLayout from "../../MainLayout";
import CharacterInfoForm from "../controls/CharacterInfoForm";
import CreateNewNpcMutation from "../../../services/mutations/npcs/CreateNewNpcMutation";

const CreateNewNpc = (): any => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const { showUserNotification } = useContext(UtilityContext);

    const onSubmit = (values: any) => {
        CreateNewNpcMutation(environment, values)
            .then(response => {
                if (response?.createNpc?.character?.id != null) {
                    updateCurrentCharacter({
                        id: response.createNpc.character.id,
                        name: response?.createNpc?.character?.id ?? "No name available"
                    });

                    // $FlowFixMe
                    history.push(Routes.defineNpc(response?.createNpc?.character?.id));
                }
                else {
                    history.push(Routes.main);
                }
            })
            .catch(e => showUserNotification({ type: 'error', graphqlError: e, message: "An error happened while creating the user." }));
    }

    return (
        <MainLayout>
            <CharacterInfoForm onSubmit={onSubmit} />
        </MainLayout>
    );
}

export default CreateNewNpc;
