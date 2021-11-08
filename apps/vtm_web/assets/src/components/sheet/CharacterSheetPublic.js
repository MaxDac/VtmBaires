// @flow

import React from "react";
import CharacterSheetInfoTab from "./sheet-sections/tabs/CharacterSheetInfoTab";

type Props = {
    characterQuery: any;
}

const CharacterSheetPublic = ({characterQuery}: Props): any => {
    return (
        <CharacterSheetInfoTab characterQuery={characterQuery} />
    );
}

export default CharacterSheetPublic;
