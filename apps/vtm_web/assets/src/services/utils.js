// @flow

import type { History } from "../_base/types";
import {Routes} from "../AppRouter";

export function handleAuthorizedRejection({ push }: History): any => void {
    return (rejection: any) => {
        console.log("unauthorized by the back end", rejection);
        push(Routes.get("login"));
    }    
}
