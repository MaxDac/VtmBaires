// @flow

import React, {Suspense} from "react";
import CharacterFragmentProvider from "../_data/CharacterFragmentProvider";
import ResponsiveInnerContainer from "../../_base/components/ResponsiveInnerContainer";
import CharacterSheetTabs from "./CharacterSheetTabs";
import Skeleton from "@mui/material/Skeleton";
import {useUserCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";
import {useSession} from "../../services/session-service";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../MainRouter";
import Paper from "@mui/material/Paper";
import CharacterSheetPublic from "./CharacterSheetPublic";

type Props = {
    id?: string;
    reload?: boolean;
    contained?: boolean;
    fetchKey?: number;
}

export const CharacterSheetSuspenseFallback = (): any => {
    return (
        <>
            <Skeleton variant="text" />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} />
        </>
    );
}

const CharacterSheet = (props: Props): any => {
    const history = useHistory();
    const userCharacters = useUserCharactersQuery();
    const [user,] = useSession();

    const canModify = character => user?.role === "master" || userCharacters.some(c => c.id === character?.id);

    const modifySheetLink = character => {
        if (canModify(character) && character?.id != null) {
            return (
                <div style={{
                    margin: "20px",
                    textAlign: "center"
                }}>
                    <Button variant="outlined" onClick={_ => history.push(MainRoutes.modifySheet(character.id))}>
                        Modifica scheda
                    </Button>
                </div>
            );
        }

        return (<></>);
    };

    const visualisation = character =>
        canModify(character)
            ? (<CharacterSheetTabs characterQuery={character} />)
            : (<CharacterSheetPublic characterQuery={character} />);

    return (
        <CharacterFragmentProvider characterId={props.id}
                                   showWarningWhenNoCharacterSelected={true}
                                   fetchKey={props.fetchKey}>
            { character =>
                <ResponsiveInnerContainer contained={props.contained}>
                    <Paper variant="outlined" sx={{backgroundColor: "background.paper"}}>
                        <Suspense fallback={<CharacterSheetSuspenseFallback />}>
                            {modifySheetLink(character)}
                            {visualisation(character)}
                        </Suspense>
                    </Paper>
                </ResponsiveInnerContainer>
            }
        </CharacterFragmentProvider>
    );
}

export default CharacterSheet;
