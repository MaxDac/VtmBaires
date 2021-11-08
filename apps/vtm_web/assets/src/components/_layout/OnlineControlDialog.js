// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import type {SessionQuery} from "../../services/queries/accounts/__generated__/SessionQuery.graphql";
import {listSessionQuery} from "../../services/queries/accounts/SessionQuery";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import AttributionIcon from "@mui/icons-material/Attribution";
import {menuIconStyle} from "./Menu";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ShowCharacterSheet from "./button-links/ShowCharacterSheet";
import SendMessageToUser from "./button-links/SendMessageToUser";
import GoToMapLocation from "./button-links/GoToMapLocation";
import SendMessageToCharacter from "./button-links/SendMessageToCharacter";

type Props = {
    closePopup: () => void;
}

const OnlineControlDialog = ({closePopup}: Props): any => {
    const online = useCustomLazyLoadQuery<SessionQuery>(listSessionQuery, {}, {
        fetchPolicy: "network-only"
    })?.sessionsList ?? [];

    const isUserMaster = user => user?.role != null && user.role === "MASTER";

    const userMasterIcon = user =>
        isUserMaster(user)
            ? (
                <Tooltip title="Master">
                    <ListItemIcon>
                        <AttributionIcon sx={menuIconStyle} />
                    </ListItemIcon>
                </Tooltip>
            )
            : (<></>);

    const secondaryActions = o => (
        <Stack direction="row" spacing={2}>
            <ShowCharacterSheet characterId={o?.character?.id} onSelected={closePopup} />
            <SendMessageToUser userId={o?.user?.id} onSelected={closePopup} />
            {
                o?.character != null
                    ? (<SendMessageToCharacter characterId={o?.character?.id} onSelected={closePopup} />)
                    : (<></>)
            }
            <GoToMapLocation locationId={o?.location?.id} onSelected={closePopup} />
        </Stack>
    );

    const onlineRow = o => (
        <ListItem key={o?.user?.id}
                  secondaryAction={secondaryActions(o)}>
            {userMasterIcon(o?.user)}
            <ListItemText inset={!isUserMaster(o?.user)}
                          primary={`${o?.user?.name ?? ""}${
                              !!o?.character?.name
                                  ? ` (${o?.character?.name})`
                                  : ""}`}
                          secondary={o?.location?.name}
            />
        </ListItem>
    );

    const onlineUserSorter = (a, b) => {
        const masterRoleAsNumber = u => u?.user?.role === "MASTER" ? 0 : 1;
        const [aRole, bRole] = [masterRoleAsNumber(a), masterRoleAsNumber(b)];

        if (aRole > bRole) {
            return 1;
        }

        if (aRole < bRole) {
            return -1;
        }

        const [aName, bName] = [a?.user?.name ?? "", b?.user?.name ?? ""];

        if (aName > bName) {
            return 1;
        }

        return -1;
    };

    // Used the rest operator because the read only array doesn't have a sort method
    const showOnline = () => [...online]
        ?.sort((a, b) => onlineUserSorter(a, b))
        ?.map(o => onlineRow(o)) ?? (<></>);

    return showOnline();
};

export default OnlineControlDialog;
