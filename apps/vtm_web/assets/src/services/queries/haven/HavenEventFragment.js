// @flow

import graphql from "babel-plugin-relay/macro";

export type HavenEvent = {|
    +id: string,
    +character: ?{|
        +id: string,
        +name: ?string,
    |},
    +haven: ?{|
        +id: string,
        +name: ?string,
        +x: ?number,
        +y: ?number,
        +character: ?{|
            +id: string,
            +name: ?string,
        |},
    |},
    +resolved: ?boolean,
    +controlTriggered: ?boolean,
    +dangerTriggered: ?boolean,
    +insertedAt: ?any,
    +updatedAt: ?any,
|};

export const havenEventFragment: any = graphql`
    fragment HavenEventFragment_fragment on HavenEvent {
        id
        character {
            id
            name
        }
        haven {
            id
            name
            x
            y
            character {
                id
                name
            }
        }
        resolved
        controlTriggered
        dangerTriggered
        insertedAt
        updatedAt
    }
`;
