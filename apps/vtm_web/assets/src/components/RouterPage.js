// @flow

import React from "react";
import type {GenericReactComponent} from "../_base/types";
import DefaultFallback from "./skeletons/DefaultFallback";

type Props = {
    children: GenericReactComponent
};

const RouterPage = ({children}: Props): any => {
    return (
        <React.Suspense fallback={<DefaultFallback />}>
            {children}
        </React.Suspense>
    );
}

export default RouterPage;
