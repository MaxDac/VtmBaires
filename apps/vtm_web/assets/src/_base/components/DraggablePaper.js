// @flow

import React from "react";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import type {GenericReactComponent} from "../types";

type Props = {
    handleid: string;
};

const DraggablePaper = (props: Props): GenericReactComponent => {
    return (
        <Draggable handle={`#${props.handleid}`}
                   cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
};

export default DraggablePaper;
