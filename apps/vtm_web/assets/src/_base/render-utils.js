// @flow

import React from "react";

/**
 * Renders conditionally an object, rendering nothing if the given condition is false.
 * @param condition The condition.
 * @param render The render component.
 * @returns {JSX.Element|*} The render element to return.
 */
export const conditionalRendering = (condition: () => boolean, render: () => any): any => {
    if (condition()) {
        return render();
    }

    return <></>
}

/**
 * Checks whether the property whose getter is given is null, if not it renders with the given function,
 * returns an empty Fragment otherwise.
 * @param propGetter The property getter.
 * @param render The render function.
 * @returns {JSX.Element|*} The render component.
 */
export const propNotNullRendering = <T>(propGetter: () => ?T, render: T => any): any => {
    const property = propGetter();

    if (property != null) {
        return render(property);
    }

    return <></>;
};
