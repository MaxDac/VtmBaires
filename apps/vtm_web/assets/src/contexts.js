// @flow

import type {SessionInfo} from "./services/session-service";
import {createContext} from "react";
import type {AlertContext} from "./_base/types";

export const SessionContext: React$Context<SessionInfo> = createContext<SessionInfo>({});
export const UtilityContext: React$Context<AlertContext> = createContext<AlertContext>({});
