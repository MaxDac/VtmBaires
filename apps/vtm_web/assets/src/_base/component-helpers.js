// @flow

import MenuItem from "@mui/material/MenuItem";
import React from "react";
import type {GenericReactComponent} from "./types";

export type SelectProps = {
    fieldName: string;
    label: string;
    values: Array<[string, string]>;
    addNullValue?: boolean,
    sx?: any;
};

export const getSelectItems = (props: SelectProps, emptyMenuItem: () => GenericReactComponent): Array<GenericReactComponent> => {
    const values = props.values;
    if (values && values.map) {
        const items = values
            .map(([value, label]) => <MenuItem key={value ?? "is-null"} value={value}>{label}</MenuItem>);

        if (props.addNullValue === true) {
            return [emptyMenuItem()].concat(items);
        }

        return items;
    }

    return [];
};
