// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, liStyle, titleStyle} from "../GuidesStyles";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {AttributesCompleteQuery} from "../../../services/queries/info/__generated__/AttributesCompleteQuery.graphql";
import {attributesCompleteQuery} from "../../../services/queries/info/AttributesCompleteQuery";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../_base/components/TabPanel";
import GuidesAttributesAttributes from "./guide-attributes/GuidesAttributesAttributes";
import GuidesAttributesDisciplines from "./guide-attributes/GuidesAttributesDisciplines";
import GuidesAttributesAdvantages from "./guide-attributes/GuidesAttributesAdvantages";

const a11yProps = index => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const GuidesAttributes = (): any => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const attributes = useCustomLazyLoadQuery<AttributesCompleteQuery>(attributesCompleteQuery, {}, {
        fetchPolicy: "store-or-network"
    })?.attributes ?? [];

    const showAttributes = (name: string, section?: string) =>
        attributes
            .filter(a => a?.attributeType?.name === name)
            .filter(a => section == null || a?.attributeType?.section === section)
            .sort((a, b) => (a?.name ?? "") > (b?.name ?? "") ? 1 : 0)
            .map(a => (
                <li style={liStyle} key={a?.id}><b>{a?.name}</b>: {a?.description}</li>
            ));

    return (
        <Box sx={{ width: '100%' }}>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Abilit&agrave;, Attributi e altri valori della Scheda
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Proponiamo di seguito una lista di Attributi, Abilit&agrave;, Discipline e Vantaggi disponibili in fase di creazione,
                con relativa descrizione.
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Attributi e Abilità" {...a11yProps(0)} />
                    <Tab label="Discipline" {...a11yProps(1)} />
                    <Tab label="Vantaggi" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <GuidesAttributesAttributes showAttributes={showAttributes} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GuidesAttributesDisciplines />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GuidesAttributesAdvantages showAttributes={showAttributes} />
            </TabPanel>
        </Box>
    );
}

export default GuidesAttributes;
