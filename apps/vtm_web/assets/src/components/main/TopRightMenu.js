// @flow

import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import sessionQuery from "../../services/queries/session-query";
import userCharactersQuery from '../../services/queries/user-characters-query';
import { useHistory } from 'react-router';
import { handleAuthorizedRejection } from '../../services/utils';
import IconActivatedMenu from '../../_base/components/IconActivatedMenu';
import {Routes} from "../../AppRouter";

import type { Session } from "../../services/queries/session-query";
import type {CharacterInfo} from "../../services/queries/character/character-types";
import {useSession} from "../../services/hooks/useSession";

export default function TopRightMenu(): any {
    const history = useHistory();

    const {
        setCurrentCharacter
    } = useSession(history);

    const [waiting, setWaiting] = useState<bool>(false);
    const [online, setOnline] = useState<Session[]>([]);
    const [characters, setCharacters] = useState<CharacterInfo[]>([]);

    const handleOnlineToggle = (open, setOpen) => 
        _ => {
            if (open) {
                setOpen(_ => false);
            }

            if (!waiting) {
                setWaiting(true);
                sessionQuery()
                    .then(sessions => {
                        setOnline(sessions.list);
                        setOpen(_ => true);
                        setWaiting(false);
                    })
                    .catch(handleAuthorizedRejection(history));
            }
        };

    const handleCharactersToggle = (open: boolean, setOpen: ((boolean => boolean) => void)) =>
        _ => {
            if (open) {
                setOpen(_ => false);
            }

            if (!waiting) {
                setWaiting(true);
                userCharactersQuery()
                    .then(sessions => {
                        setCharacters(sessions.me.userCharacters);
                        setOpen(_ => true);
                        setWaiting(false);
                    })
                    .catch(handleAuthorizedRejection(history));
            }
        };

    const currentOnline = () => online?.length ?? 0;

    const showOnline = handleClose => 
        online.map(o => <MenuItem onClick={handleClose}>{o.name}</MenuItem>);

    const handleCharacterSelection = (info: CharacterInfo, handleClose: Event => void) =>
        _ => {
            setCurrentCharacter(info);
            history.push(Routes.creation2);
        }

    const showCharacters = handleClose => {
        if (characters && characters.length && characters.length > 0) {
            return characters.map(o =>
                <MenuItem key={Number(o.id)} onClick={handleCharacterSelection(o, handleClose)}>{o.name}</MenuItem>);
        }

        return <MenuItem onClick={_ => history.push(Routes.creation1)}>Create new</MenuItem>
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
                               badgeContent={currentOnline()}
                               handleToggle={handleOnlineToggle}
                               title="Online">
                {h => showOnline(h)}
            </IconActivatedMenu>
        </>
    );
}
