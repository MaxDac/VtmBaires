// @flow

import React from 'react';
import MainLayout from "../Main.Layout";
import type {DefaultComponentProps} from "../../_base/types";

export default function Main({openDialog}: DefaultComponentProps): any {
    return (
        <MainLayout openDialog={openDialog}>
            { classes =>
                <div>
                    Test
                </div>
            }
        </MainLayout>
    )
}
