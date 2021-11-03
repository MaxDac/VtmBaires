// @flow

import React, {useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {setValue} from "relay-runtime/lib/store/RelayModernRecord";
import ListSubheader from "@mui/material/ListSubheader";

export type SetControlValue = string => void;

export type SetControlError = string => void;

type AttributeSelectionFieldProps = {
    label: string;
    fieldName: string;
    value: string;
    values: () => Array<[string, string, string]>;
    onChange: (string, string, SetControlValue, SetControlError) => void;
}

const AttributeSelectionField = (props: AttributeSelectionFieldProps): any => {
    const [innerValue, setInnerValue] = useState(props.value);
    const [error, setError] = useState("");

    const items = () => {
        const values = props.values();

        if (values && values.reduce) {
            return values.reduce(([prevGroup, acc], [group, value, label]) => {
                const selectItem = <MenuItem key={value} value={value}>{label}</MenuItem>;

                if (group !== prevGroup) {
                    return [group, [
                        ...acc,
                        <ListSubheader>{group}</ListSubheader>,
                        selectItem
                    ]];
                }

                return [group, [
                    ...acc,
                    selectItem
                ]]
            }, ["", []]);
                // .map(([grouping, value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>);
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
        <div style={{padding: "10px", textAlign: "center"}}>
            <FormControl>
                <InputLabel id="select-label">{props.label}</InputLabel>
                <Select labelId="select-label"
                        id={props.fieldName}
                        name={props.fieldName}
                        fullWidth
                        value={innerValue}
                        onChange={onChange}
                        error={hasError()}
                        sx={{
                            minWidth: "150px"
                        }}
                        aria-errormessage={error}>
                    {items()}
                </Select>
            </FormControl>
        </div>
    );
}

export default AttributeSelectionField;
