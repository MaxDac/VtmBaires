// @flow

import React, {useContext, useState} from "react";
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {UtilityContext} from "../../../../contexts";
import HuntMutation from "../../../../services/mutations/characters/HuntMutation";
import {useRelayEnvironment} from "react-relay";
import {useSession} from "../../../../services/session-service";
import type {HuntMutationResponse} from "../../../../services/mutations/characters/__generated__/HuntMutation.graphql";
import {characterIsVampire} from "../../../../_base/utils";
import {menuIconStyle, MenuSecondaryText} from "../menu-base-utils";
import {useIsCharacterAwake} from "../../../../services/queries/character/IsCharacterAwakeQuery";
import AwakeCharacterMutation from "../../../../services/mutations/characters/AwakeCharacterMutation";
import type {
    AwakeCharacterMutationResponse
} from "../../../../services/mutations/characters/__generated__/AwakeCharacterMutation.graphql";

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
}: MenuHuntSectionInternalProps): any => {
    const isCharacterAwake = useIsCharacterAwake(characterId, awakeFetchKey);

    return isCharacterAwake
        ? (<MenuHuntControl huntRequest={huntRequest} />)
        : (<MenuAwakeControl awakeRequest={awakeRequest} />);
};

const MenuHuntSection = (): any => {
    const environment = useRelayEnvironment();
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const [,character] = useSession();
    const isCharacterVampire = characterIsVampire(character);
    const [awakeFetchKey, setAwakeFetchKey] = useState(1);

    const huntRequest = () => {
        if (character?.id != null) {
            openDialog(
                "Caccia",
                "Sei sicuro di voler mandare il tuo personaggio a caccia? Potrai giocare subito dopo, ma non potrai far cacciare di nuovo il personaggio per un altro giorno",
                () => {
                    if (character?.id != null) {
                        HuntMutation(environment, character.id)
                            .then((result: HuntMutationResponse) => {
                                setAwakeFetchKey(p => p + 1);
                                if (result?.hunt?.result != null) {
                                    const huntResult = result.hunt.result;

                                    showUserNotification({
                                        type: "info",
                                        duration: 7000,
                                        message: huntResult
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
                                console.error("Error while hunting!", e);
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

    const awakeRequest = () => {
        if (character?.id != null) {
            openDialog(
                "Caccia",
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

    if (isCharacterVampire && character?.id != null) {
        return (<MenuHuntSectionInternal huntRequest={huntRequest}
                                         awakeRequest={awakeRequest}
                                         characterId={character.id}
                                         awakeFetchKey={awakeFetchKey} />);
    }

    return (<></>);
}

export default MenuHuntSection;
