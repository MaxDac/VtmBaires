// @flow

import React, {useContext, useState} from "react";
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {UtilityContext} from "../../../../contexts";
import {useRelayEnvironment} from "react-relay";
import {useSession} from "../../../../services/session-service";
import {characterIsVampire} from "../../../../_base/utils";
import {menuIconStyle, MenuSecondaryText} from "../menu-base-utils";
import {useIsCharacterAwake} from "../../../../services/queries/character/IsCharacterAwakeQuery";
import AwakeCharacterMutation from "../../../../services/mutations/characters/AwakeCharacterMutation";
import type {
    AwakeCharacterMutationResponse
} from "../../../../services/mutations/characters/__generated__/AwakeCharacterMutation.graphql";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../../../MainRouter";
import type {GenericReactComponent} from "../../../../_base/types";

const MenuHuntControl = ({huntRequest}) => (
    <ListItem button onClick={huntRequest}>
        <ListItemIcon>
            <InvertColorsIcon sx={menuIconStyle} />
        </ListItemIcon>
        <ListItemText secondary={<MenuSecondaryText text="Caccia" />} />
    </ListItem>
);

const MenuAwakeControl = ({awakeRequest}) => (
    <ListItem button onClick={awakeRequest}>
        <ListItemIcon>
            <RemoveRedEyeTwoToneIcon sx={menuIconStyle} />
        </ListItemIcon>
        <ListItemText secondary={<MenuSecondaryText text="Risveglio" />} />
    </ListItem>
);

type MenuHuntSectionInternalProps = {|
    characterId: string;
    awakeRequest: any => void;
    huntRequest: any => void;
    awakeFetchKey: number;
|};

const MenuHuntSectionInternal = ({
                                     characterId,
                                     awakeRequest,
                                     huntRequest,
                                     awakeFetchKey
}: MenuHuntSectionInternalProps): GenericReactComponent => {
    const isCharacterAwake = useIsCharacterAwake(characterId, awakeFetchKey);

    return isCharacterAwake
        ? (<MenuHuntControl huntRequest={huntRequest} />)
        : (<MenuAwakeControl awakeRequest={awakeRequest} />);
};

const MenuHuntSection = (): GenericReactComponent => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const [,character] = useSession();
    const isCharacterVampire = characterIsVampire(character);
    const [awakeFetchKey, setAwakeFetchKey] = useState(1);

    const awakeRequest = () => {
        if (character?.id != null) {
            openDialog(
                "Risveglio",
                "Sei sicuro di voler risvegliare il tuo personaggio?",
                () => {
                    if (character?.id != null) {
                        AwakeCharacterMutation(environment, character.id)
                            .then((result: AwakeCharacterMutationResponse) => {
                                setAwakeFetchKey(p => p + 1);
                                if (result?.awake?.result != null) {
                                    const awakeResult = result.awake.result;

                                    showUserNotification({
                                        type: "info",
                                        duration: 7000,
                                        message: awakeResult
                                    });
                                }
                                else {
                                    console.error("No back end message", result);
                                    showUserNotification({
                                        type: "error",
                                        message: "Qualcosa non è andato come previsto, contatta un master per maggiori informazioni."
                                    });
                                }
                            })
                            .catch(e => {
                                setAwakeFetchKey(p => p + 1);
                                console.error("Error while awakening!", e);
                                showUserNotification({
                                    type: "error",
                                    message: "Qualcosa non è andato come previsto, contatta un master per maggiori informazioni."
                                })
                            });
                    }
                    else {
                        showUserNotification({
                            type: "error",
                            message: "Devi prima selezionare il personaggio."
                        });
                    }
                });
        }
        else {
            showUserNotification({
                type: "warning",
                message: "Devi selezionare un personaggio prima di cacciare."
            });
        }
    };

    const huntRequest = () => history.push(MainRoutes.hunt);

    if (isCharacterVampire && character?.id != null) {
        return (<MenuHuntSectionInternal awakeRequest={awakeRequest}
                                         huntRequest={huntRequest}
                                         characterId={character.id}
                                         awakeFetchKey={awakeFetchKey} />);
    }

    return (<></>);
}

export default MenuHuntSection;
