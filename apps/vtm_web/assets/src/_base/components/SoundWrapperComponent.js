// @flow

import React, {useEffect, useMemo, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {menuIconStyle} from "../../components/_layout/Menu";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

type Props = {
    id?: string;
    soundSourceUrl: string;
}

const SoundWrapperComponent = ({id, soundSourceUrl}: Props): any => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackDuration, setTrackDuration] = useState(0);
    const [trackCurrent, setTrackCurrent] = useState(0);
    const [volume, setVolume] = useState(30);

    const audioRef = useRef();

    const playingIcon = () => isPlaying
        ? (<PauseIcon sx={menuIconStyle} />)
        : (<PlayArrowIcon sx={menuIconStyle} />);

    const volumeDown = useMemo(() => <VolumeDown />);

    const volumeUp = useMemo(() => <VolumeUp />);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        }
        else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {

        audioRef.current.addEventListener("canplay", function() {
            this.volume = 0.3;
            setTrackDuration(_ => this.duration);
        });

        audioRef.current.addEventListener("timeupdate", function() {
            setTrackCurrent(_ => this.currentTime);
        });

    }, []);

    const onVolumeChanged = ({target: {value}}) => {
        audioRef.current.volume = value / 100;
        setVolume(_ => value);
    }

    const onTrackChanged = ({target: {value}}) => {
        audioRef.current.currentTime = value;
        setTrackCurrent(_ => value);
    }

    return (
        <Box>
            <Stack direction="row"
                   sx={{mb: 1, px: 1, maxWidth: "400px", margin: "0 auto"}}>
                <IconButton aria-label="Play"
                            onClick={_ => setIsPlaying(p => !p)}>
                    {playingIcon()}
                </IconButton>
                <Slider size="small"
                        max={trackDuration}
                        min={0}
                        defaultValue={0}
                        value={trackCurrent}
                        aria-label="Track"
                        onChange={onTrackChanged}
                        sx={{
                            width: "250px",
                            marginTop: "auto",
                            marginBottom: "auto"
                        }} />
                <Stack direction="row"
                       spacing={1}
                       sx={{
                           width: "200px",
                           mb: 1,
                           px: 1,
                           marginTop: "auto",
                           marginBottom: "auto"
                       }}
                       alignItems="center">
                    {volumeDown}
                    <Slider aria-label="Volume"
                            max={100}
                            min={0}
                            value={volume}
                            onChange={onVolumeChanged} />
                    {volumeUp}
                </Stack>
            </Stack>
            <audio id={id ?? "sound-control-wrapper"}
                   ref={audioRef}
                   src={soundSourceUrl} />
        </Box>
    );
}

export default SoundWrapperComponent;
