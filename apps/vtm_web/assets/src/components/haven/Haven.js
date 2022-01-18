// @flow

import React from "react";
import HavenMap from "./controls/HavenMap";

const Haven = (): any => {
    return (
        <>
            <h1 style={{
                fontFamily: 'Disturbed',
                marginRight: "20px"
            }}>
                Rifugio
            </h1>
            <HavenMap onSectionSelected={s => console.debug(s)} />
        </>
    );
}

export default Haven;
