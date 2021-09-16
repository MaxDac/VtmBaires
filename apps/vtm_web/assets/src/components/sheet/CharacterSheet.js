// @flow

import React from "react";
import MainLayout from "../Main.Layout";
import CharacterSheetInfoSection from "./sheet-sections/CharacterSheetInfoSection";
import CharacterFragmentProvider from "../_data/CharacterFragmentProvider";
import ResponsiveInnerContainer from "../../_base/components/ResponsiveInnerContainer";
import ConcealedCharacterInfo from "../_data/ConcealedCharacterInfo";
import CharacterSheetTabbedSections from "./sheet-sections/CharacterSheetTabbedSections";

type Props = {
    id?: ?string;
}

const CharacterSheet = (props: Props): any => {
    return (
        <MainLayout>
            { classes =>
                <CharacterFragmentProvider characterId={props?.id}>
                    { character =>
                        <ResponsiveInnerContainer classes={classes}>
                            <CharacterSheetInfoSection classes={classes} characterQuery={character} />
                            <ConcealedCharacterInfo characterId={props?.id}>
                                <CharacterSheetTabbedSections classes={classes} characterQuery={character} />
                            </ConcealedCharacterInfo>
                        </ResponsiveInnerContainer>
                    }
                </CharacterFragmentProvider>
            }
        </MainLayout>
    )
}

export default CharacterSheet;
