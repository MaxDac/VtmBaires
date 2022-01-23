// @flow

import React from "react";
import type {GenericReactComponent} from "../../_base/types";
import {useParams} from "react-router-dom";
import type {CharacterSheetComponentProps} from "./sheet-components/CharacterSheetComponent";
import CharacterSheetComponent from "./sheet-components/CharacterSheetComponent";
import RequireAuth from "../_auth/RequireAuth";
import RouterPage from "../RouterPage";

const CharacterSheet = (): GenericReactComponent => {
    const props: CharacterSheetComponentProps = useParams();

    return (
        <RequireAuth>
            <RouterPage>
                <CharacterSheetComponent {...props} />
            </RouterPage>
        </RequireAuth>
    );
};

export default CharacterSheet;
