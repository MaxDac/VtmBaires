// @flow

import React, {useState, Suspense, useContext, createRef} from "react";
import { RelayEnvironmentProvider } from 'react-relay';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlertLayout from './_base/components/AlertLayout';
import AppRouter from "./AppRouter";
import {SnackbarProvider} from "notistack";
import type { Node } from 'react';
import {ErrorBoundaryWithRetry} from "./_base/components/ErrorBoundaryWithRetry";
import FallbackComponent from "./components/FallbackComponent";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {useEnv} from "./_base/relay-environment";
import type {IEnvironment} from "relay-runtime";
import {SessionContext, UtilityContext} from "./contexts";
import {getSessionHookValue} from "./services/session-service";
import MainSuspenseFallback from "./MainSuspenseFallback";
import { performLogout } from "./services/logout-service";
import {LoginRoutes} from "./components/login/LoginRouter";

const Internal = ({env}: { env: IEnvironment}) => {
    const { showUserNotification } = useContext(UtilityContext);
    const history = useHistory();

    const fallback = (error, _retry): any => {
        console.error("An unhandled error happened in the app", error)
        showUserNotification({
            type: "error",
            message: "There was an error in the application"
        });

        return (
            <FallbackComponent error={error} retry={_retry} />
        );
    };

    return (
        <ErrorBoundaryWithRetry fallback={fallback}
                                onUnauthorized={() => performLogout(() => history.push(LoginRoutes.login))}>
            <RelayEnvironmentProvider environment={env}>
                <AppRouter />
            </RelayEnvironmentProvider>
        </ErrorBoundaryWithRetry>);
}

function App(): Node {
    const darkState = useState(true);
    const paletteType = darkState ? "dark" : "light";
    const environment = useEnv();

    const darkTheme = createTheme({
        palette: {
            mode: paletteType,
            primary: {
                main: "#aa0b0e",
                dark: "#760709",
                light: "#bb3b3e"
            },
            secondary: {
                main: "#81d4fa"
            }
        },
        components: {
            MuiSpeedDial: {
                styleOverrides: {
                    fab: {
                        backgroundColor: "#aa0b0e",
                        color: "white"
                    },
                    "fab:hover": {
                        backgroundColor: "#aa0b0e",
                        color: "white"
                    }
                }
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
            <Suspense fallback={<MainSuspenseFallback />}>
                <SnackbarProvider maxSnack={3}
                                  ref={snackbarsRef}
                                  preventDuplicate
                                  variant="outlined"
                                  action={key =>
                                      <Button onClick={onSnackbarDismissClick(key)} sx={{
                                          color: "black"
                                      }}>
                                          Dismiss
                                      </Button>
                                  }>
                    <AlertLayout>
                        { props =>
                            <UtilityContext.Provider value={props}>
                                <SessionContext.Provider value={getSessionHookValue(environment)}>
                                    <Internal env={environment} />
                                </SessionContext.Provider>
                            </UtilityContext.Provider>
                        }
                    </AlertLayout>
                </SnackbarProvider>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
