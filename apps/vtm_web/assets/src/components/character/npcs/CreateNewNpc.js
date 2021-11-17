// @flow

import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {updateCurrentCharacter} from "../../../services/session-service";
import {UtilityContext} from "../../../contexts";
import {useRelayEnvironment} from "react-relay";
import CharacterInfoForm from "../../creation/controls/CharacterInfoForm";
import CreateNewNpcMutation from "../../../services/mutations/npcs/CreateNewNpcMutation";
import {MainRoutes} from "../../MainRouter";
import {Routes} from "../../../AppRouter";

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
                        name: response?.createNpc?.character?.id ?? "No name available",
                        clan: {
                            ...response?.createNpc?.character?.clan
                        }
                    });

                    // Forcing the cast after having checked the id for nulls
                    const characterId: string = (response?.createNpc?.character?.id: any);
                    history.push(MainRoutes.defineNpc(characterId));
                }
                else {
                    history.push(Routes.main);
                }
            })
            .catch(e => showUserNotification({ type: 'error', graphqlError: e, message: "An error happened while creating the user." }));
    }

    return (
        <CharacterInfoForm onSubmit={onSubmit} />
    );
}

export default CreateNewNpc;
