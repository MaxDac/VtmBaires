// @flow

import type {Node} from "react";
import React from "react";
import MuiAlert from "@mui/lab/Alert";

export type AlertProps = {
    type: 'success' | 'info' | 'warning' | 'error';
    onClose: (SyntheticEvent<any, Event>, "timeout" | "clickaway") => void;
    children: Node;
};

const Alert = (props: AlertProps): Node => 
    <MuiAlert elevation={6} severity={props.type} onClose={props.onClose}>
        {props.children}
    </MuiAlert>;

export default Alert;
