// @flow

import React, {createContext, useState, Suspense, useContext, createRef} from "react";
import { RelayEnvironmentProvider } from 'react-relay';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import AlertLayout from './_base/components/AlertLayout';
import AppRouter, {Routes} from "./AppRouter";
import {SnackbarProvider} from "notistack";
import type { Node } from 'react';
import {ErrorBoundaryWithRetry} from "./_base/components/ErrorBoundaryWithRetry";
import {
    getLoginInformation,
    getUserSessionInfo,
    updateCurrentCharacter
} from "./services/session-service";
import type {SessionCharacter, UserSessionInfo} from "./services/session-service";
import FallbackComponent from "./components/FallbackComponent";
import Button from "@material-ui/core/Button";
import type {User} from "./services/base-types";
import {useHistory} from "react-router-dom";
import type {AlertContext} from "./_base/types";
import {useEnv} from "./_base/relay-environment";

export type SessionInfo = {
    getUser: () => ?User;
    getCharacter: () => ?SessionCharacter;
    setCurrentCharacter: SessionCharacter => ?UserSessionInfo;
};

/**
 * This custom hook retrieves the session information.
 * @returns {SessionInfo} The session info.
 */
export function getSession(): SessionInfo {
    return {
        getUser: getLoginInformation,
        getCharacter: () => getUserSessionInfo()?.selectedCharacter,
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

    return (
        <ErrorBoundaryWithRetry fallback={fallback} onUnauthorized={() => history.push(Routes.login)}>
            <Suspense fallback={"loading ..."}>
                <RelayEnvironmentProvider environment={environment}>
                    <AppRouter />
                </RelayEnvironmentProvider>
            </Suspense>
        </ErrorBoundaryWithRetry>);
}

function App(): Node {
    const darkState = useState(true);
    const palletType = darkState ? "dark" : "light";

    const darkTheme = createTheme({
        palette: {
            type: palletType,
        },
        primary: {
            main: "#1a237e",
        },
        secondary: {
            main: "#aa0b0e",
        },
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
                            <SessionContext.Provider value={getSession()}>
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
