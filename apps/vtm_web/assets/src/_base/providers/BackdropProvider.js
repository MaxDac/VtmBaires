// @flow

import type {Context} from "react";
import React, {createContext, useContext, useState} from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import type {GenericReactComponent} from "../types";

export type BackdropContextProps = {
    startWait: () => void;
    stopWait: () => void;
}

export const BackdropContext: Context<BackdropContextProps> = createContext({
    startWait: () => {},
    stopWait: () => {}
});

export const useWait = (): BackdropContextProps =>
    useContext(BackdropContext);

type Props = {
    children: GenericReactComponent;
};

const BackdropProvider = ({children}: Props): GenericReactComponent => {
    const [backdropOpen, setBackdropOpen] = useState(false);

    const handleBackdropClose = () => setBackdropOpen(false);

    const handleBackdropOpen = () => setBackdropOpen(true);

    return (
        <>
            <Backdrop open={backdropOpen}>
                <CircularProgress variant="indeterminate"
                                  size={40}
                                  thickness={4}
                                  color="inherit" />
            </Backdrop>
            <BackdropContext.Provider value={{
                startWait: handleBackdropOpen,
                stopWait: handleBackdropClose
            }}>
                {children}
            </BackdropContext.Provider>
        </>
    );
};

export default BackdropProvider;
