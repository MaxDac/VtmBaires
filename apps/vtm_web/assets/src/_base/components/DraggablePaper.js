// @flow

import React from "react";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";

type Props = {
    handleid: string;
};

const DraggablePaper = (props: Props): any => {
    return (
        <Draggable handle={`#${props.handleid}`}
                   cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
};

export default DraggablePaper;
