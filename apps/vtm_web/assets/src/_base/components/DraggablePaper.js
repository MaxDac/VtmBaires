// @flow

import React from "react";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";

type Props = {
    handleId: string;
};

const DraggablePaper = (props: Props): any => {
    return (
        <Draggable handle={`#${props.handleId}`}
                   cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
};

export default DraggablePaper;
