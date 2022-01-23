// @flow

import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import createCharacter from "../../services/mutations/characters/CreateCharacterMutation";
import {updateCurrentCharacter} from "../../services/session-service";
import {UtilityContext} from "../../contexts";
import {useRelayEnvironment} from "react-relay";
import CharacterInfoForm from "./controls/CharacterInfoForm";
import {MainRoutes} from "../MainRouter";
import type {CharacterCreationRequest} from "../../services/mutations/npcs/__generated__/CreateNewNpcMutation.graphql";
import type {GenericReactComponent} from "../../_base/types";
import RequireAuth from "../_auth/RequireAuth";
import RouterPage from "../RouterPage";

const Creation1 = (): GenericReactComponent => {
    const navigate = useNavigate();
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);

    const onSubmit = (values: CharacterCreationRequest) => {
        createCharacter(environment, values)
            .then(response => {
                if (response?.createCharacter != null) {
                    updateCurrentCharacter(environment)({
                        id: response.createCharacter?.id,
                        name: response.createCharacter?.name ?? "No name available",
                        clan: {
                            ...response.createCharacter?.clan?.name
                        } 
                    }).catch(e => console.error("Error while updating session character", e));

                    navigate(MainRoutes.creation2);

                    // Refreshing the page in order to update the left menu
                    document.location.reload(false);
                }
            })
            .catch(e => {
                showUserNotification({
                    type: 'error',
                    graphqlError: e,
                    message: "An error happened while creating the user."
                })
            });
    }

    return (
        <RequireAuth>
            <RouterPage>
                <CharacterInfoForm onSubmit={onSubmit} />
            </RouterPage>
        </RequireAuth>
    );
}

export default Creation1;
