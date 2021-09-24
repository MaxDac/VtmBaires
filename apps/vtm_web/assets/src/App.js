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
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import type {IEnvironment} from "relay-runtime";
import {SessionContext, UtilityContext} from "./contexts";
import {getSessionHookValue} from "./services/session-service";

const Internal = ({env}: { env: IEnvironment}) => {
    const { setError } = useContext(UtilityContext);
    const history = useHistory();

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
                <RelayEnvironmentProvider environment={env}>
                    <AppRouter />
                </RelayEnvironmentProvider>
            </Suspense>
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
                            <SessionContext.Provider value={getSessionHookValue(environment)}>
                                <Internal env={environment} />
                            </SessionContext.Provider>
                        </UtilityContext.Provider>
                    }
                </AlertLayout>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
