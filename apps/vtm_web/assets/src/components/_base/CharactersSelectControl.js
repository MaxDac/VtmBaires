// @flow

import React, {useMemo} from "react";
import FormSelectField from "../../_base/components/FormSelectField";
import {orderAlphabetically} from "../../_base/utils";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import type {AllCharactersQuery} from "../../services/queries/character/__generated__/AllCharactersQuery.graphql";
import {allCharactersQuery} from "../../services/queries/character/AllCharactersQuery";
import PlainSelectField from "../../_base/components/PlainSelectField";
import type {GenericReactComponent} from "../../_base/types";

const CharactersSelectControlInternal = ({label, characterValues, onChange, defaultValue}): GenericReactComponent => {
    const [value, setValue] = React.useState<string>(defaultValue ?? "");

    const onChangeInternal = v => {
        setValue(_ => v);

        if (onChange != null) {
            onChange(v);
        }
    };

    return (
        <PlainSelectField selectedValue={value}
                          onChange={onChangeInternal}
                          fieldName="characterId"
                          label={label}
                          values={characterValues}/>
    );
}

type Props = {
    label: string;
    fieldName?: string;
    formik?: any;
    onChange?: string => void;
    value?: string;
}

const CharactersSelectControl = ({label, fieldName, formik, onChange, value}: Props): GenericReactComponent => {
    const allCharacters = useCustomLazyLoadQuery<AllCharactersQuery>(allCharactersQuery, {})?.charactersList;

    const characterValues = useMemo((): Array<[string, string]> => {
        const values: Array<[string, string]> = allCharacters
            ?.map(v => [v?.id ?? "", v?.name ?? ""])
            ?.sort(([_aId, aName], [_bId, bName]) => orderAlphabetically(aName, bName)) ?? [];

        return [["", "None"]].concat(values);
    }, [allCharacters]);

    if (formik != null) {
        return (
            <FormSelectField formik={formik}
                             fieldName={fieldName ?? "characterId"}
                             label={label}
                             values={characterValues} />
        );
    }

    return (
        <CharactersSelectControlInternal label={label}
                                         characterValues={characterValues}
                                         onChange={onChange}
                                         defaultValue={value} />
    );
}

export default CharactersSelectControl;
