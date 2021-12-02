// @flow

import React, {Suspense} from "react";
import CharacterFragmentProvider from "../_data/CharacterFragmentProvider";
import ResponsiveInnerContainer from "../../_base/components/ResponsiveInnerContainer";
import Paper from "@mui/material/Paper";
import {CharacterSheetSuspenseFallback} from "./CharacterSheet";
import {useHistory} from "react-router-dom";
import {useUserCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";
import {useSession} from "../../services/session-service";
import Button from "@mui/material/Button";
import {MainRoutes} from "../MainRouter";
import CharacterSheetTabs from "./sheet-sections/tabs/CharacterSheetTabs";

type Props = {
    id?: string;
    reload?: boolean;
    contained?: boolean;
    fetchKey?: number;
}

const CharacterSheetComplete = (props: Props): any => {
    const history = useHistory();
    const userCharacters = useUserCharactersQuery();
    const [user,] = useSession();

    const canModify = character => user?.role === "MASTER" || userCharacters.some(c => c.id === character?.id);

    const modifySheetLink = character => {
        if (!(props.contained === true) && canModify(character) && character?.id != null) {
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

    return (
        <CharacterFragmentProvider characterId={props.id}
                                   showWarningWhenNoCharacterSelected={true}
                                   reload={props.reload}
                                   fetchKey={props.fetchKey}>
            { character =>
                <ResponsiveInnerContainer>
                    <Paper variant="outlined" sx={{backgroundColor: "background.paper"}}>
                        <Suspense fallback={<CharacterSheetSuspenseFallback />}>
                            {modifySheetLink(character)}
                            <CharacterSheetTabs characterQuery={character} />
                        </Suspense>
                    </Paper>
                </ResponsiveInnerContainer>
            }
        </CharacterFragmentProvider>
    );
}

export default CharacterSheetComplete;
