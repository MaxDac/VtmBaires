// @flow

import React, {useCallback, useContext, useState, Suspense} from "react";
import MainLayout from "../../MainLayout";
import CharacterProvider from "../../_data/CharacterProvider";
import CharacterSheetStatsSection from "../sheet-sections/CharacterSheetStatsSection";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AttributeSwitchControl from "../controls/AttributeSwitchControl";
import useAttributesSlimQuery from "../../../services/queries/info/AttributesSlimQuery";
import switchCharacterAttributeMutation from "../../../services/mutations/characters/SwitchCharacterAttributeMutation";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../../contexts";
import {useTheme} from "@mui/styles";
import Button from "@mui/material/Button";
import type {RefreshedQueryOption} from "../sheet-sections/CharacterSheetStatsSection";
import FinalizeCharacterMutation from "../../../services/mutations/characters/FinalizeCharacterMutation";
import {useHistory} from "react-router-dom";
import {Routes} from "../../../AppRouter";
import {destroySession} from "../../../services/session-service";
import DeleteCharacterMutation from "../../../services/mutations/characters/DeleteCharacterMutation";
import CharacterFragmentProvider from "../../_data/CharacterFragmentProvider";

type Props = {

};

const Internal = ({character}) => {
    const theme = useTheme();
    const {setWait, showUserNotification, openDialog} = useContext(UtilityContext);
    const environment = useRelayEnvironment();
    const attributes = useAttributesSlimQuery()?.attributes;
    const history = useHistory();

    const [refreshedQueryOptions, setRefreshedQueryOptions] = useState<?RefreshedQueryOption>(null);
    
    const refresh = useCallback(() => {
        setRefreshedQueryOptions(previous => ({
            fetchKey: (previous?.fetchKey ?? 0) + 1,
            fetchPolicy: "network-only"
        }));
    }, []);

    const filterAttrs = (type: string): Array<[string, string]> => attributes
        ?.filter(a => a?.attributeType?.name === type)
        ?.map(a => [String(a?.id), String(a?.name)]) ?? [];

    const getAttributes = () => filterAttrs("Attribute");

    const getSkills = () => filterAttrs("Ability");

    const switchCharacterAttributes = ({
        characterId: id,
        firstAttribute: first,
        secondAttribute: second
                                       }) => {
        setWait(true);

        switchCharacterAttributeMutation(environment, {
            characterId: id,
            firstAttribute: first,
            secondAttribute: second
        })
            .then(r => {
                console.log("response", r);
            })
            .catch(e => {
                showUserNotification({
                    type: "error",
                    graphqlError: e,
                    message: "C'e' stato un errore nella gestione della richiesta."
                });
            })
            .finally(() => {
                setWait(false);
                refresh();
            });
    }

    const completeCharacter = (characterId: string) => {
        openDialog("Conferma personaggio", "Sei sicuro di voler cancellare il personaggio?", () => {
            FinalizeCharacterMutation(environment, characterId)
                .then(r => {
                    console.log("character creation successful", r);
                    showUserNotification({type: "success", message: "Il tuo personaggio è stato creato con successo!"})
                    setTimeout(() => history.push(Routes.main), 1000);
                })
                .catch(e => {
                    showUserNotification({
                        type: "error",
                        graphqlError: e,
                        message: "C'è stato un errore durante la finalizzazione del personaggio."
                    })
                });
        });
    }

    const deleteCharacter = (characterId: string) => {
        openDialog("Conferma cancellazione", "Sei sicuro di voler cancellare il personaggio?", () => {
            DeleteCharacterMutation(environment, characterId)
                .then(r => {
                    console.log("character deletion successful", r);
                    showUserNotification({type: "success", message: "Il tuo personaggio è stato cancellato!"});
                    destroySession().finally(() => history.push(Routes.main));
                })
                .catch(e => {
                    showUserNotification({
                        type: "error",
                        graphqlError: e,
                        message: "C'è stato un errore durante la finalizzazione del personaggio."
                    })
                })
        });
    }

    if (character?.id != null) {
        return (
            <>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <AttributeSwitchControl firstAttributeLabel="Primo Attributo"
                                                secondAttributeLabel="Secondo Attributo"
                                                values={getAttributes()}
                                                characterId={character.id}
                                                onChangeSelected={switchCharacterAttributes} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <AttributeSwitchControl firstAttributeLabel="Prima Abilità"
                                                secondAttributeLabel="Seconda Abilità"
                                                values={getSkills()}
                                                characterId={character.id}
                                                onChangeSelected={switchCharacterAttributes} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography xs={{padding: theme.spacing(2)}}>
                            Una volta finito, puoi schiacciare il bottone sottostante per confermare il personaggio.
                            Una volta confermato, sar&agrave; sottoposto all'attenzione dei master, che potranno accettare,
                            o proporre correzioni, al tuo personaggio.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => completeCharacter(character.id)}>
                            Conferma il personaggio!
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{padding: theme.spacing(2)}}>
                            Se non sei soddisfatto, e vuoi cominciare da capo, sentiti libero di cancellare il personaggio.
                            Avrai la possibilit&agrave; di farne un altro cliccando sull'icona personaggio in alto a destra.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => deleteCharacter(character.id)}>
                            Cancella il personaggio
                        </Button>
                    </Grid>
                </Grid>
                <Suspense fallback={"loading..."}>
                    <CharacterFragmentProvider characterId={character.id}
                                               showWarningWhenNoCharacterSelected={true}>
                        { ch =>
                            <CharacterSheetStatsSection characterId={character.id}
                                                        characterQuery={ch}
                                                        queryOptions={refreshedQueryOptions}
                                                        hideAdvantages
                                                        hideStatus />
                        }
                    </CharacterFragmentProvider>
                </Suspense>
            </>
        );
    }
    
    return (<></>);
}

const Creation5 = (_: Props): any =>
    <MainLayout>
        <Typography>
            Complimenti! Hai inserito tutti i dati del tuo personaggio, adesso la tua scheda &egrave; pronta per poter essere approvata.
        </Typography>
        <Typography>
            Adesso puoi apportare modifiche alla tua scheda, ora che è completa. Puoi scambiare i valori tra attributi e abilit&agrave;.
            Per apportare altre modifiche, contatta un master.
        </Typography>
        <CharacterProvider showWarningWhenNoCharacterSelected={true}>
            { character =>
                <Internal character={character} />
            }
        </CharacterProvider>
    </MainLayout>;

export default Creation5;
