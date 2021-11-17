// @flow

import React, {useState, Suspense, useContext, createRef} from "react";
import { RelayEnvironmentProvider } from 'react-relay';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlertLayout from './_base/components/AlertLayout';
import AppRouter, {Routes} from "./AppRouter";
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
                                onUnauthorized={() => performLogout(() => history.push(Routes.sessionExpired))}>
            <RelayEnvironmentProvider environment={env}>
                <AppRouter />
            </RelayEnvironmentProvider>
        </ErrorBoundaryWithRetry>);
}

const App = (): Node => {
    const darkState = useState(true);
    const paletteType = darkState ? "dark" : "light";
    const environment = useEnv();

    const darkTheme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                paper: "#191919"
            },
            primary: {
                main: "#A0A0A0",
                dark: "#505050",
                light: "#C0C0C0"
            },
            secondary: {
                main: "#580B0B",
                dark: "#380707",
                light: "#9a2828"
            },
            third: {
                main: "#C9C9C9"
            }
        },
        components: {
            MuiSpeedDial: {
                styleOverrides: {
                    fab: {
                        backgroundColor: "#580B0B",
                        color: "white"
                    },
                    "fab:hover": {
                        backgroundColor: "#580B0B",
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
                                          OK
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
