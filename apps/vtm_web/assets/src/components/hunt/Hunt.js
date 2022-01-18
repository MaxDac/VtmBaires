// @flow

import React, {useContext, useState} from "react";
import HavenMap from "../haven/controls/HavenMap";
import HuntMutation from "../../services/mutations/characters/HuntMutation";
import type {HuntMutationResponse} from "../../services/mutations/characters/__generated__/HuntMutation.graphql";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../contexts";
import {useSession} from "../../services/session-service";
import {characterIsVampire} from "../../_base/utils";
import Typography from "@mui/material/Typography";
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import {menuIconStyle} from "../_layout/menu/menu-base-utils";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {useIsCharacterAwake} from "../../services/queries/character/IsCharacterAwakeQuery";
import Button from "@mui/material/Button";

const HuntInternal = ({characterId}) => {
    const environment = useRelayEnvironment();
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const [,character] = useSession();

    const isCharacterVampire = characterIsVampire(character);
    const [awakeFetchKey, setAwakeFetchKey] = useState(1);
    const [showHelp, setShowHelp] = useState(false);
    const [personalHavenId, setPersonalHavenId] = React.useState<?string>(null);

    const isCharacterAwake = useIsCharacterAwake(characterId, awakeFetchKey);

    const onSectionSelected = ({id}) => huntRequest(id);

    const selectPersonalHaven = () => {
        if (personalHavenId != null) {
            huntRequest(personalHavenId);
        }
        else {
            showUserNotification({
                type: "warning",
                message: "Il tuo personaggio non ha attualmente un rifugio"
            });
        }
    };

    const showPersonalHavenHuntButton = () => {
        if (personalHavenId != null) {
            return (
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "1rem"
                }}>
                    <Button type="submit"
                            variant="outlined"
                            fullWidth
                            color="primary"
                            onClick={_ => selectPersonalHaven()}
                            sx={{
                                width: "80%"
                            }}>
                        Caccia nel Dominio personale
                    </Button>
                </Box>
            )
        }

        return (<></>);
    };

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
                        <IconButton onClick={_ => setShowHelp(p => !p)}>
                            <HelpTwoToneIcon sx={{menuIconStyle}}/>
                        </IconButton>
                    </Stack>
                </h1>

                <Box component="div" sx={{
                    display: showHelp ? "inline" : "none"
                }}>
                    <Typography paragraph>
                        La citt&agrave; &egrave; a disposizione del tuo personaggio per la caccia. Puoi scegliere la
                        zona
                        del tuo Dominio, una zona conosciuta non troppo esposta al rischio, oppure muoverti per la
                        citt&agrave;, ricordando che zone sconosciute potrebbero nascondere dei pericoli inaspettati.
                    </Typography>

                    <Typography paragraph>
                        Puoi anche selezionare una zona gi&agrave; occupata da un altro personaggio, ma ricorda che in
                        quel caso
                        &egrave; possibile che il tuo personaggio venga identificato a cacciare nel Dominio di un altro
                        Cainita,
                        con conseguenze anche spiacevoli.
                    </Typography>
                </Box>

                {showPersonalHavenHuntButton()}

                <HavenMap onSectionSelected={onSectionSelected} setPersonalHaven={id => setPersonalHavenId(_ => id)} />
            </>
        );
    }

    return (<></>);
};

const Hunt = (): any => {
    const [,character] = useSession();

    if (character?.id != null) {
        return (
            <HuntInternal characterId={character.id} />
        )
    }

    return (<></>);
}

export default Hunt;
