// @flow

import React, {createContext, useState, Suspense, useContext, createRef} from "react";
import { RelayEnvironmentProvider } from 'react-relay';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlertLayout from './_base/components/AlertLayout';
import AppRouter, {Routes} from "./AppRouter";
import {SnackbarProvider} from "notistack";
import type { Node } from 'react';
import {ErrorBoundaryWithRetry} from "./_base/components/ErrorBoundaryWithRetry";
import {getSession, updateCurrentCharacter} from "./services/session-service";
import FallbackComponent from "./components/FallbackComponent";
import Button from "@mui/material/Button";
import type {Session, SessionCharacter} from "./services/base-types";
import {useHistory} from "react-router-dom";
import type {AlertContext} from "./_base/types";
import {useEnv} from "./_base/relay-environment";
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import type {User} from "./services/base-types";

export type SessionInfo = {
    getUser: () => ?User;
    getCharacter: () => ?SessionCharacter;
    setCurrentCharacter: SessionCharacter => ?Session;
};

/**
 * This custom hook retrieves the session information.
 * @returns {SessionInfo} The session info.
 */
export function getSessionHookValue(): SessionInfo {
    return {
        getUser: () => getSession()?.user,
        getCharacter: () => getSession()?.session,
        setCurrentCharacter: updateCurrentCharacter
    };
}

export const SessionContext: React$Context<SessionInfo> = createContext<SessionInfo>({});
export const UtilityContext: React$Context<AlertContext> = createContext<AlertContext>({});

const Internal = () => {
    const { setError } = useContext(UtilityContext);
    const history = useHistory();
    const environment = useEnv();

    const fallback = (error, _retry): any => {
        console.error("An unhandled error happened in the app", error)
        setError({
            type: "error",
            message: "There was an error in the application"
        });

        return (
            <FallbackComponent error={error} retry={_retry} />
        );
    };

    const suspenseFallback = () => (
        <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
    )

    return (
        <ErrorBoundaryWithRetry fallback={fallback} onUnauthorized={() => history.push(Routes.login)}>
            <Suspense fallback={suspenseFallback()}>
                <RelayEnvironmentProvider environment={environment}>
                    <AppRouter />
                </RelayEnvironmentProvider>
            </Suspense>
        </ErrorBoundaryWithRetry>);
}

function App(): Node {
    const darkState = useState(true);
    const paletteType = darkState ? "dark" : "light";

    const darkTheme = createTheme({
        palette: {
            mode: paletteType,
            primary: {
                main: "#81d4fa"
            },
            secondary: {
                main: "#aa0b0e",
                dark: "#760709",
                light: "#bb3b3e"
            }
        }
    });

    const snackbarsRef = createRef();

    const onSnackbarDismissClick = key =>
        () => (snackbarsRef.current: any).closeSnackbar(key);

    // const handleThemeChange = () => {
    //     setDarkState(!darkState);
    // };

    return (
        <ThemeProvider theme={darkTheme}>
            <SnackbarProvider maxSnack={3}
                              ref={snackbarsRef}
                              preventDuplicate
                              action={key =>
                                  <Button onClick={onSnackbarDismissClick(key)}>
                                      Dismiss
                                  </Button>
                              }>
                <AlertLayout>
                    { props =>
                        <UtilityContext.Provider value={props}>
                            <SessionContext.Provider value={getSessionHookValue()}>
                                <Internal />
                            </SessionContext.Provider>
                        </UtilityContext.Provider>
                    }
                </AlertLayout>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
