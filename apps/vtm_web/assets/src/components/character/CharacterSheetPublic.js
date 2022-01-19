// @flow

import React, {Suspense} from "react";
import CharacterSheetInfoTab from "./sheet-sections/tabs/CharacterSheetInfoTab";
import CharacterFragmentPublicProviderQuery from "../_data/CharacterPublicFragmentProvider";
import ResponsiveInnerContainer from "../../_base/components/ResponsiveInnerContainer";
import Paper from "@mui/material/Paper";
import {CharacterSheetSuspenseFallback} from "./CharacterSheet";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    id: string;
    reload?: boolean;
    contained?: boolean;
    fetchKey?: number;
}

const CharacterSheetPublic = (props: Props): GenericReactComponent => {
    return (
        <CharacterFragmentPublicProviderQuery {...props}>
            { character =>
                <ResponsiveInnerContainer contained={props.contained}>
                    <Paper variant="outlined" sx={{
                        backgroundColor: "background.paper",
                        padding: "2rem"
                    }}>
                        <Suspense fallback={<CharacterSheetSuspenseFallback />}>
                            <CharacterSheetInfoTab characterQuery={character} />
                        </Suspense>
                    </Paper>
                </ResponsiveInnerContainer>
            }
        </CharacterFragmentPublicProviderQuery>
    );
}

export default CharacterSheetPublic;
