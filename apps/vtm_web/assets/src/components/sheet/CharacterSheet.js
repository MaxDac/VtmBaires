// @flow

import React, {Suspense} from "react";
import CharacterSheetInfoSection from "./sheet-sections/CharacterSheetInfoSection";
import CharacterFragmentProvider from "../_data/CharacterFragmentProvider";
import ResponsiveInnerContainer from "../../_base/components/ResponsiveInnerContainer";
import ConcealedCharacterInfo from "../_data/ConcealedCharacterInfo";
import CharacterSheetTabbedSections from "./sheet-sections/CharacterSheetTabbedSections";
import useStyles from "../Main.Layout.Style";
import Skeleton from "@mui/material/Skeleton";
import {useUserCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";
import {useSession} from "../../services/session-service";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../MainRouter";

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
    const classes = useStyles();
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
    }

    return (
        <CharacterFragmentProvider characterId={props.id}
                                   showWarningWhenNoCharacterSelected={true}
                                   fetchKey={props.fetchKey}>
            { character =>
                <ResponsiveInnerContainer contained={props.contained} sx={{
                    background: "linear-gradient(to right, #19191900, #191919A0)"
                }}>
                    <Suspense fallback={<CharacterSheetSuspenseFallback />}>
                        {modifySheetLink(character)}
                        <CharacterSheetInfoSection classes={classes} characterQuery={character} />
                        <ConcealedCharacterInfo characterId={props?.id}>
                            <CharacterSheetTabbedSections classes={classes} characterQuery={character} />
                        </ConcealedCharacterInfo>
                    </Suspense>
                </ResponsiveInnerContainer>
            }
        </CharacterFragmentProvider>
    );
}

export default CharacterSheet;
