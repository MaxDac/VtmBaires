// @flow

import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {updateCurrentCharacter} from "../../../services/session-service";
import {UtilityContext} from "../../../contexts";
import {useRelayEnvironment} from "react-relay";
import CharacterInfoForm from "../../creation/controls/CharacterInfoForm";
import CreateNewNpcMutation from "../../../services/mutations/npcs/CreateNewNpcMutation";
import {AppRoutes} from "../../../AppRouter";
import type {GenericReactComponent} from "../../../_base/types";
import {AdminRoutes} from "../../admin/AdminRouter";

const CreateNewNpc = (): GenericReactComponent => {
    const navigate = useNavigate();
    const environment = useRelayEnvironment();
    const { showUserNotification } = useContext(UtilityContext);

    const onSubmit = (values: any) => {
        CreateNewNpcMutation(environment, values)
            .then(response => {
                if (response?.createNpc?.character?.id != null) {
                    updateCurrentCharacter(environment)({
                        id: response.createNpc?.character?.id,
                        name: response?.createNpc?.character?.id ?? "No name available",
                        clan: {
                            ...response?.createNpc?.character?.clan
                        }
                    }).catch(e => console.error("Error while updating session character", e));

                    // Forcing the cast after having checked the id for nulls
                    const characterId: string = (response?.createNpc?.character?.id: any);
                    navigate(AdminRoutes.defineNpc(characterId));
                }
                else {
                    navigate(AppRoutes.main);
                }
            })
            .catch(e => showUserNotification({ type: 'error', graphqlError: e, message: "An error happened while creating the user." }));
    }

    return (
        <CharacterInfoForm onSubmit={onSubmit} />
    );
}

export default CreateNewNpc;
