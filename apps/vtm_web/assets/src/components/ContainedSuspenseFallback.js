// @flow

import React from "react";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

type Props = {

}

const ContainedSuspenseFallback = (props: Props): any => {
    return (
        <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </Box>
    );
}

export default ContainedSuspenseFallback;
