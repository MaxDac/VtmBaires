// @flow

import React, {useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import TabPanel from "../../_base/components/TabPanel";
import {mainFontFamily} from "../Main.Layout.Style";
import CharacterSheetInfoTab from "./sheet-sections/tabs/CharacterSheetInfoTab";
import CharacterSheetStatsTab from "./sheet-sections/tabs/CharacterSheetStatsTab";
import CharacterSheetDataTab from "./sheet-sections/tabs/CharacterSheetDataTab";

type Props = {
    characterQuery: {id: string}
}

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const CharacterSheetTabs = ({characterQuery}: Props): any => {
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example">
                    <Tab label="Info" {...a11yProps(0)} sx={mainFontFamily} />
                    <Tab label="Stats" {...a11yProps(1)} sx={mainFontFamily} />
                    <Tab label="Data" {...a11yProps(2)} sx={mainFontFamily} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <CharacterSheetInfoTab characterQuery={characterQuery} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CharacterSheetStatsTab characterQuery={characterQuery} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CharacterSheetDataTab characterQuery={characterQuery} />
            </TabPanel>
        </Box>
    );
}

export default CharacterSheetTabs;
