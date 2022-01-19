// @flow

import React, {useContext, useState} from "react";
import HavenMap from "../_base/HavenMap";
import HuntMutation from "../../services/mutations/characters/HuntMutation";
import type {HuntMutationResponse} from "../../services/mutations/characters/__generated__/HuntMutation.graphql";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../contexts";
import {useSession} from "../../services/session-service";
import { characterIsVampire, tryCastToOneType } from "../../_base/utils";
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import {menuIconStyle} from "../_layout/menu/menu-base-utils";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {useIsCharacterAwake} from "../../services/queries/character/IsCharacterAwakeQuery";
import Button from "@mui/material/Button";
import {GuideRoutes} from "../guides/GuidesMain";
import type {Haven} from "../../services/queries/haven/GetHavensQuery";
import type {GenericReactComponent} from "../../_base/types";

const HuntInternal = ({characterId}) => {
    const environment = useRelayEnvironment();
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const [,character] = useSession();

    const isCharacterVampire = characterIsVampire(character);
    const [awakeFetchKey, setAwakeFetchKey] = useState(1);
    const [personalHavenId, setPersonalHavenId] = React.useState<?string>(null);

    const isCharacterAwake = useIsCharacterAwake(characterId, awakeFetchKey);

    const showHuntHelp = _ => {
        const newTab = window.open(`#${GuideRoutes.hunt}`, "_blank");
        newTab.focus();
    }

    const onSectionSelected = h => {
        const haven = tryCastToOneType<Haven, string>(h);
        
        if (haven?.id != null) {
            huntRequest(haven.id);
        }
    }

    // TODO - Hidden for now, because the personal Domain is already highlighted in the map locations. Check if it's ok with the feedbacks
    //
    // const selectPersonalHaven = () => {
    //     if (personalHavenId != null) {
    //         huntRequest(personalHavenId);
    //     }
    //     else {
    //         showUserNotification({
    //             type: "warning",
    //             message: "Il tuo personaggio non ha attualmente un rifugio"
    //         });
    //     }
    // };
    //
    // const showPersonalHavenHuntButton = () => {
    //     if (personalHavenId != null) {
    //         return (
    //             <Box sx={{
    //                 width: "100%",
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 padding: "1rem"
    //             }}>
    //                 <Button type="submit"
    //                         variant="outlined"
    //                         fullWidth
    //                         color="primary"
    //                         onClick={_ => selectPersonalHaven()}
    //                         sx={{
    //                             width: "80%"
    //                         }}>
    //                     Caccia nel Dominio personale
    //                 </Button>
    //             </Box>
    //         )
    //     }
    //
    //     return (<></>);
    // };

    const huntRequest = havenId => {
        if (character?.id != null) {
            openDialog(
                "Caccia",
                "Sei sicuro di voler mandare il tuo personaggio a caccia? Potrai giocare subito dopo, ma non potrai far cacciare di nuovo il personaggio per un altro giorno",
                () => {
                    if (character?.id != null && havenId != null) {
                        HuntMutation(environment, {
                            characterId: character.id,
                            havenId
                        })
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

    if (isCharacterVampire && isCharacterAwake) {
        return (
            <>
                <h1 style={{
                    fontFamily: 'Disturbed',
                    marginRight: "20px"
                }}>
                    <Stack direction="row" sx={{
                        alignItems: "middle"
                    }}>
                        <Box>
                            Caccia
                        </Box>
                        <IconButton onClick={showHuntHelp}>
                            <HelpTwoToneIcon sx={{menuIconStyle}}/>
                        </IconButton>
                    </Stack>
                </h1>

                {/*TODO - See above for the personal domain button*/}
                {/*{showPersonalHavenHuntButton()}*/}

                <HavenMap onSectionSelected={onSectionSelected}
                          setPersonalHaven={id => setPersonalHavenId(_ => id)} />
            </>
        );
    }

    return (<></>);
};

const Hunt = (): GenericReactComponent => {
    const [,character] = useSession();

    if (character?.id != null) {
        return (
            <HuntInternal characterId={character.id} />
        )
    }

    return (<></>);
}

export default Hunt;
