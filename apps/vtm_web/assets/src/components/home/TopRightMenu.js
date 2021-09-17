// @flow

import React, {useContext, useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useHistory } from 'react-router-dom';
import IconActivatedMenu from '../../_base/components/IconActivatedMenu';
import {Routes} from "../../AppRouter";
import IconButton from "@material-ui/core/IconButton";
import {logout} from "../../services/login-service";
import Avatar from "@material-ui/core/Avatar";
import {SessionContext, UtilityContext} from "../../App";
import type {BaseInfo} from "../../services/base-types";
import {getSessions} from "../../services/queries/accounts/SessionQuery";
import {
    userCharactersQuery
} from "../../services/queries/accounts/UserCharactersQuery";
import type {UserCharactersQuery} from "../../services/queries/accounts/__generated__/UserCharactersQuery.graphql";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {handleAuthorizedRejection, log} from "../../_base/utils";

type Props = {
    classes: any;
}

export default function TopRightMenu({ classes }: Props): any {
    const history = useHistory();
    const { setCurrentCharacter } = useContext(SessionContext);
    const { openDialog } = useContext(UtilityContext);

    const [waiting, setWaiting] = useState<bool>(false);
    const [online, setOnline] = useState<Array<BaseInfo>>([]);
    const character = useCustomLazyLoadQuery<UserCharactersQuery>(userCharactersQuery, {}, {
        fetchPolicy: "store-and-network"
    })?.me?.userCharacters;

    const handleOnlineToggle = (open, setOpen) =>
        _ => {
            if (open) {
                setOpen(_ => false);
            }

            if (!waiting) {
                setWaiting(true);
                getSessions()
                    .then(sessions => {
                        setOnline(sessions);
                        setOpen(_ => true);
                        setWaiting(false);
                    })
                    .catch(handleAuthorizedRejection(history));
            }
        };

    const handleCharactersToggle = (open: boolean, setOpen: ((boolean => boolean) => void)) =>
        _ => setOpen(_ => !open);

    const showOnline = handleClose =>
        online.map(o => <MenuItem onClick={handleClose}>{o.name}</MenuItem>);

    const handleCharacterSelection = (info: any, _handleClose: Event => void) =>
        _ => {
            setCurrentCharacter(info);

            if (!info.approved || !info.isComplete) {
                history.push(`${Routes.creationBase}${info.stage + 1}`);
            }
        }

    const showCharacters = handleClose => {
        const chs = character;
        if (chs != null && chs.length > 0) {
            return chs
                .filter(o => o !== null)
                .map(o => (
                    <MenuItem key={Number(o?.id)} onClick={handleCharacterSelection(o, handleClose)} style={{
                        width: "200px"
                    }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{width: "30px"}}>
                                        <Avatar src={o?.chatAvatar} className={classes.smallAvatar} />
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        {o?.name}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </MenuItem>
                ));
        }

        return <MenuItem onClick={_ => history.push(Routes.creation1)}>Create new</MenuItem>;
    }

    const logoutClick = _ => {
        openDialog("Logout", "Do you want to log out?", () => {
            logout()
                .then(_ => {
                    localStorage.clear();
                    sessionStorage.clear();
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
