// @flow

import React, {Suspense} from "react";
import MainLayout from "../Main.Layout";
import CharacterSheetInfoSection from "./sheet-sections/CharacterSheetInfoSection";
import CharacterFragmentProvider from "../_data/CharacterFragmentProvider";
import ResponsiveInnerContainer from "../../_base/components/ResponsiveInnerContainer";
import ConcealedCharacterInfo from "../_data/ConcealedCharacterInfo";
import CharacterSheetTabbedSections from "./sheet-sections/CharacterSheetTabbedSections";
import useStyles from "../Main.Layout.Style";
import Skeleton from "@mui/material/Skeleton";

type Props = {
    id?: ?string;
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
    const classes = useStyles();

    return (
        <MainLayout>
            <CharacterFragmentProvider characterId={props?.id}>
                { character =>
                    <ResponsiveInnerContainer classes={classes}>
                        <Suspense fallback={<CharacterSheetSuspenseFallback />}>
                            <CharacterSheetInfoSection classes={classes} characterQuery={character} />
                            <ConcealedCharacterInfo characterId={props?.id}>
                                <CharacterSheetTabbedSections classes={classes} characterQuery={character} />
                            </ConcealedCharacterInfo>
                        </Suspense>
                    </ResponsiveInnerContainer>
                }
            </CharacterFragmentProvider>
        </MainLayout>
    )
}

export default CharacterSheet;
