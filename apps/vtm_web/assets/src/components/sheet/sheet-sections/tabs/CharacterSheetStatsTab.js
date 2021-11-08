// @flow

import React, {Suspense} from "react";
import {CharacterSheetSuspenseFallback} from "../../CharacterSheet";
import CharacterSheetStatsSection from "../sections/CharacterSheetStatsSection";

type Props = {
    characterQuery: any;
}

const CharacterSheetStatsTab = ({characterQuery}: Props): any => {
    return (
        <Suspense fallback={<CharacterSheetSuspenseFallback />}>
            { characterQuery?.id != null
                ? <CharacterSheetStatsSection characterId={characterQuery.id}
                                              characterQuery={characterQuery} />
                : <></>
            }
        </Suspense>
    );
};

export default CharacterSheetStatsTab;
