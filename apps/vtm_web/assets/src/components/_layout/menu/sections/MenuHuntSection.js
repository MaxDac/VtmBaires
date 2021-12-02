// @flow

import React, {useContext} from "react";
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {UtilityContext} from "../../../../contexts";
import HuntMutation from "../../../../services/mutations/characters/HuntMutation";
import {useRelayEnvironment} from "react-relay";
import {useSession} from "../../../../services/session-service";
import type {HuntMutationResponse} from "../../../../services/mutations/characters/__generated__/HuntMutation.graphql";
import { characterIsVampire } from "../../../../_base/utils";
import {menuIconStyle, MenuSecondaryText} from "../menu-base-utils";

type MenuHuntSectionInternalProps = {
    huntRequest: any => void;
};

const MenuHuntSectionInternal = ({huntRequest}: MenuHuntSectionInternalProps): any => {
    const [,character] = useSession();

    const showHuntMenu = () => {
        if (characterIsVampire(character)) {
            return (
                <ListItem button onClick={huntRequest}>
                    <ListItemIcon>
                        <InvertColorsIcon sx={menuIconStyle} />
                    </ListItemIcon>
                    <ListItemText secondary={<MenuSecondaryText text="Caccia" />} />
                </ListItem>
            );
        }

        return (<></>);
    };

    return showHuntMenu();
};

const MenuHuntSection = (): any => {
    const environment = useRelayEnvironment();
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const [,character] = useSession();

    const huntRequest = () => {
        if (character?.id != null) {
            openDialog(
                "Caccia",
                "Sei sicuro di voler mandare il tuo personaggio a caccia? Potrai giocare subito dopo, ma non potrai far cacciare di nuovo il personaggio per un altro giorno",
                () => {
                    if (character?.id != null) {
                        HuntMutation(environment, character.id)
                            .then((result: HuntMutationResponse) => {
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
    }

    return (<MenuHuntSectionInternal huntRequest={huntRequest} />);
}

export default MenuHuntSection;
