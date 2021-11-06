// @flow

import Grid from "@mui/material/Grid";
import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {getAllChatLocationsQuery} from "../../../services/queries/chat/GetAllChatLocationsQuery";
import type {GetAllChatLocationsQuery} from "../../../services/queries/chat/__generated__/GetAllChatLocationsQuery.graphql";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type {GetAdminChatEntriesQuery} from "../../../services/queries/chat/__generated__/GetAdminChatEntriesQuery.graphql";
import { getAdminChatEntriesQuery } from "../../../services/queries/chat/GetAdminChatEntriesQuery";

type ChatViewerInternalProps = {
    from: any,
    to: any,
    mapId: string
}

const ChatViewerInternal = ({from, to, mapId}: ChatViewerInternalProps) => {
    const entries = useCustomLazyLoadQuery<GetAdminChatEntriesQuery>(getAdminChatEntriesQuery, {
        mapId: mapId, 
        fromDate: from, 
        toDate: to
    });

    const rows = () => entries
        ?.mapAdminChatEntries
        ?.map(entry => (
            <TableRow key={entry?.id}
                      sx={{
                          '&:last-child td, &:last-child th': {
                              border: 0
                          }
                      }}>
                <TableCell component="th" scope="row">
                    {entry?.insertedAt}
                </TableCell>
                <TableCell>{entry?.character?.name}</TableCell>
                <TableCell>{entry?.text}</TableCell>
            </TableRow>
        ));

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="chat-logs">
                <TableHead>
                    <TableRow>
                        <TableCell>Ora</TableCell>
                        <TableCell>Personaggio</TableCell>
                        <TableCell>Testo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows()}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const ChatViewer = (): any => {
    const chatRooms = useCustomLazyLoadQuery<GetAllChatLocationsQuery>(getAllChatLocationsQuery, {})
        ?.allChatLocations;

    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [selectedChatId, setSelectedChatId] = useState<?string>(null);

    const showAllChatRooms = () => {
        const def = [<MenuItem key={-1} id={null}>{" "}</MenuItem>];

        if (chatRooms != null && chatRooms.length > 0) {
            const roomItems = chatRooms
                .map(val => (<MenuItem key={val?.id} value={val?.id}>{val?.name}</MenuItem>));
            
            return def.concat(roomItems);
        }

        return def;
    }

    const handleFromChange = newValue => {
        setFrom(_ => newValue);
    };

    const handleToChange = newValue => {
        setTo(_ => newValue);
    };

    const handleChatRoomChange = ({target: {value}}) => {
        setSelectedChatId(_ => value);
    }

    const showRows = () => {
        if (selectedChatId != null) {
            return (<ChatViewerInternal mapId={selectedChatId}
                                        from={from}
                                        to={to} />);
        }

        return (<></>);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container>
                <Grid item xs={12} sm={6} md={4} sx={{textAlign: "center"}}>
                    <DateTimePicker
                        label="A partire da"
                        value={from}
                        date={from}
                        onChange={handleFromChange}
                        renderInput={(params) => <TextField {...params} />} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{textAlign: "center"}}>
                    <DateTimePicker
                        label="Fino a"
                        value={to}
                        date={to}
                        onChange={handleToChange}
                        renderInput={(params) => <TextField {...params} />} />
                </Grid>
                <Grid item xs={12} md={4} sx={{textAlign: "center"}}>
                    <FormControl fullWidth>
                        <InputLabel id="chat-room">Chat</InputLabel>
                        <Select labelId="chat-room"
                                id="chat-room-select"
                                value={selectedChatId}
                                label="Age"
                                onChange={handleChatRoomChange}>
                            {showAllChatRooms()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{
                    margin: "20px",
                    padding: "20px"
                }}>
                    {showRows()}
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default ChatViewer;
