// @flow

import React, {useContext} from 'react';
import MenuItem from '@mui/material/MenuItem';
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useHistory } from 'react-router-dom';
import IconActivatedMenu from '../../_base/components/IconActivatedMenu';
import {Routes} from "../../AppRouter";
import IconButton from "@mui/material/IconButton";
import {logout} from "../../services/login-service";
import Avatar from "@mui/material/Avatar";
import {
    userCharactersQuery
} from "../../services/queries/accounts/UserCharactersQuery";
import type {UserCharactersQuery} from "../../services/queries/accounts/__generated__/UserCharactersQuery.graphql";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import useStyles from "../Main.Layout.Style";
import {useSessionQuery} from "../../services/queries/accounts/SessionQuery";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {useSession} from "../../services/session-service";
import {SessionContext, UtilityContext} from "../../contexts";
import ForumIcon from '@mui/icons-material/Forum';

export default function TopRightMenu(): any {
    const history = useHistory();
    const classes = useStyles();
    const { setCurrentCharacter } = useContext(SessionContext);
    const [, currentCharacter] = useSession();
    const { openDialog } = useContext(UtilityContext);
    const online = useSessionQuery()?.list ?? [];
    const characters = useCustomLazyLoadQuery<UserCharactersQuery>(userCharactersQuery, {}, {
        fetchPolicy: "store-and-network"
    })?.me?.userCharacters;

    const handleOnlineToggle = (open, setOpen) =>
        _ => setOpen(_ => !open);

    const handleCharactersToggle = (open: boolean, setOpen: ((boolean => boolean) => void)) =>
        _ => setOpen(_ => !open);

    const showOnline = handleClose =>
        online.map(o => <MenuItem key={o?.id} onClick={handleClose}>{o?.name}{
            !!o?.sessionCharacter?.name
                ? ` (${o?.sessionCharacter?.name})`
                : ""
        }</MenuItem>);

    const handleCharacterSelection = (info: any, _handleClose: Event => void) =>
        _ => {
            setCurrentCharacter(info);

            if (!info.approved || !info.isComplete) {
                history.push(`${Routes.creationBase}${info.stage + 1}`);
            }
        }

    const showCharacters = handleClose => {
        const chs = characters;
        if (chs != null && chs.length > 0) {
            return chs
                .filter(o => o !== null)
                .map(o => {
                    return (
                        <MenuItem key={Number(o?.id)} onClick={handleCharacterSelection(o, handleClose)} style={{
                            width: "200px"
                        }}>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{width: "30px"}}>
                                        <Avatar src={o?.chatAvatar} className={classes.smallAvatar}/>
                                    </td>
                                    <td style={{textAlign: "center", width: "calc(100% - 60px)"}}>
                                        {o?.name}
                                    </td>
                                    <td style={{width: "30px", verticalAlign: "bottom"}}>
                                        {o?.id === currentCharacter?.id
                                            ? <RadioButtonCheckedIcon/>
                                            : <RadioButtonUncheckedIcon/>
                                        }
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </MenuItem>
                    )
                });
        }

        return <MenuItem onClick={_ => history.push(Routes.creation1)}>Create new</MenuItem>;
    }

    const logoutClick = _ => {
        openDialog("Logout", "Do you want to log out?", () => {
            logout()
                .then(_ => {
                    localStorage.clear();
                    sessionStorage.clear();
                    console.log("performing logout");
                    history.push(Routes.login);
                })
                .catch(e => {
                    console.error("Error while performing logout", e);
                    history.push(Routes.login);
                });
        });
    }

    return (
        <>
            <IconButton aria-label="messages" onClick={_ => history.push(Routes.messages)}>
                <ForumIcon />
            </IconButton>
            <IconActivatedMenu icon={() => <AccountCircleOutlinedIcon />}
                               badgeContent={0}
                               handleToggle={handleCharactersToggle}
                               title="Characters">
                {h => showCharacters(h)}
            </IconActivatedMenu>
            <IconActivatedMenu icon={() => <PeopleIcon />}
                               badgeContent={0}
                               handleToggle={handleOnlineToggle}
                               title="Online">
                {h => showOnline(h)}
            </IconActivatedMenu>
            <IconButton aria-label="logout" onClick={logoutClick}>
                <ExitToAppIcon />
            </IconButton>
        </>
    );
}
