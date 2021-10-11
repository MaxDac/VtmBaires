// @flow

import React, {Suspense} from "react";
import MainLayout from "../MainLayout";
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
import {Routes} from "../../AppRouter";

type Props = {
    id?: ?string;
    reload?: ?boolean;
    contained?: ?boolean;
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
                    <Button variant="contained" onClick={_ => history.push(Routes.modifySheet(character.id))}>
                        Modifica scheda
                    </Button>
                </div>
            );
        }

        return (<></>);
    }

    const sheet = () => (
        <CharacterFragmentProvider characterId={props?.id}>
            { character =>
                <ResponsiveInnerContainer contained={props.contained}>
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

    if (props.contained === true) {
        return sheet();
    }
    else {
        return (
            <MainLayout>
                {sheet()}
            </MainLayout>
        );
    }
}

export default CharacterSheet;
