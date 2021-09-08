// @flow

import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {useStyles} from "../../_base/components/FormSelectField";
import MenuItem from "@material-ui/core/MenuItem";
import {setValue} from "relay-runtime/lib/store/RelayModernRecord";

export type SetControlValue = string => void;

export type SetControlError = string => void;

type AttributeSelectionFieldProps = {
    label: string;
    fieldName: string;
    value: string;
    values: () => Array<[string, string]>;
    onChange: (string, string, SetControlValue, SetControlError) => void;
}

const AttributeSelectionField = (props: AttributeSelectionFieldProps): any => {
    const [innerValue, setInnerValue] = useState(props.value);
    const [error, setError] = useState("");
    const classes = useStyles();

    const items = () => {
        const values = props.values();

        if (values && values.map) {
            return values
                .map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>);
        }

        return [];
    }

    const setControlValue = (value: string) =>
        setValue(_ => value);

    const setControlError = (error: string) =>
        setError(_ => error);

    const onChange = ({ target: { value } }: any) => {
        setInnerValue(_ => value);
        props.onChange(props.fieldName, value, setControlValue, setControlError);
    }

    const hasError = (): boolean => {
        return error !== undefined && error !== "";
    }

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-label">{props.label}</InputLabel>
            <Select
                labelId="select-label"
                id={props.fieldName}
                name={props.fieldName}
                fullWidth
                value={innerValue}
                onChange={onChange}
                error={hasError()}
                aria-errormessage={error}>
                {items()}
            </Select>
        </FormControl>
    );
}

export default AttributeSelectionField;
