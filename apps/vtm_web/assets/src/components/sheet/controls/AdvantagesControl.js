// @flow

import React, {useState} from "react";
import {attributesSlimQuery} from "../../../services/queries/info/AttributesSlimQuery";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import type {Attribute} from "../../../services/queries/info/AttributesQuery";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

const AdvantagesControl = (): any => {
    const {attributes}: { attributes: Array<Attribute> } = useCustomLazyLoadQuery(attributesSlimQuery, {});

    const [error, _] = useState(false);

    const getAdvantages: () => Array<[string, string, string]> = () =>
        attributes
            .filter(a => a.attributeType.name === "Advantage")
            .flatMap(a => [1, 2, 3, 4, 5].map(i => [String(a.id), a.name, String(i)]));

    const handleChange = e => {
        console.log("event", e);
    }

    const values = () => getAdvantages()
        .map(([id, label, value]) => (
            <FormControlLabel key={`${id}-${value}`}
                              control={<Checkbox checked={true} onChange={handleChange} name={`${id}-${value}`} />}
                              label={`${label}-${value}`} />
        ));

    return (
        <FormControl required error={error} component="fieldset" style={{margin: "10px"}}>
            <FormLabel component="legend">Pick two</FormLabel>
            <FormGroup>
                {values()}
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
    );
}

export default AdvantagesControl;
