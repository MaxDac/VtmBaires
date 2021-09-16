// @flow

import React, {useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';
import {TabPanel} from "@material-ui/lab";
import CharacterSheetBiographySection from "./CharacterSheetBiographySection";
import type {GetCharacterQueryResponse} from "../../../services/queries/character/__generated__/GetCharacterQuery.graphql";

type Props = {
    classes: any,
    characterQuery: GetCharacterQueryResponse
}

const CharacterSheetTabbedSections = ({classes, characterQuery}: Props): any => {
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    }

    function a11yProps(index) {
        return {
            id: `scrollable-force-tab-${index}`,
            'aria-controls': `scrollable-force-tabpanel-${index}`,
        };
    }

    return (
        <div className={classes.responseInnerContainer}>
            <AppBar position="static" color="default">
                <Tabs value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary">
                    <Tab label="Info" icon={<PersonIcon />} {...a11yProps(0)} />
                    <Tab label="Sheet" icon={<ListIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CharacterSheetBiographySection classes={classes} characterQuery={characterQuery} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CharacterSheetBiographySection classes={classes} characterQuery={characterQuery} />
            </TabPanel>
        </div>
    );
}

export default CharacterSheetTabbedSections;
