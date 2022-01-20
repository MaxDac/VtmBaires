// @flow

import React, {useMemo} from "react";
import FormSelectField from "../../_base/components/FormSelectField";
import {orderAlphabetically} from "../../_base/utils";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import type {AllUsersQuery} from "../../services/queries/accounts/__generated__/AllUsersQuery.graphql";
import {allUsersQuery} from "../../services/queries/accounts/AllUsersQuery";
import type {GenericReactComponent} from "../../_base/types";

type Props = {
    label: string;
    formik: any;
}

const UsersSelectControl = ({label, formik}: Props): GenericReactComponent => {
    const allUsers = useCustomLazyLoadQuery<AllUsersQuery>(allUsersQuery, {})?.allUsers;

    const userValues = useMemo((): Array<[string, string]> => {
        const values: Array<[string, string]> = allUsers
            ?.map(v => [v?.id ?? "", v?.name ?? ""])
            ?.sort(([_aId, aName], [_bId, bName]) => orderAlphabetically(aName, bName)) ?? [];

        return [["", "None"]].concat(values);
    }, [allUsers]);

    return (
        <FormSelectField formik={formik}
                         fieldName="userId"
                         label={label}
                         values={userValues} />
    );
}

export default UsersSelectControl;
