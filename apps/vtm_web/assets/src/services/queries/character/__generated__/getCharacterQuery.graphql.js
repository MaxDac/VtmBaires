/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type getCharacterQueryVariables = {|
  id: string
|};
export type getCharacterQueryResponse = {|
  +getCharacter: ?{|
    +info: ?{|
      +id: ?string,
      +name: ?string,
      +avatar: ?string,
    |},
    +biography: ?string,
    +description: ?string,
    +clan: ?{|
      +id: ?string,
      +name: ?string,
    |},
    +humanity: ?number,
    +stage: ?number,
    +approved: ?boolean,
    +isComplete: ?boolean,
    +isNpc: ?boolean,
  |}
|};
export type getCharacterQuery = {|
  variables: getCharacterQueryVariables,
  response: getCharacterQueryResponse,
|};


/*
query getCharacterQuery(
  $id: ID!
) {
  getCharacter(id: $id) {
    info {
      id
      name
      avatar
    }
    biography
    description
    clan {
      id
      name
    }
    humanity
    stage
    approved
    isComplete
    isNpc
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "getCharacter",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CharacterInfo",
        "kind": "LinkedField",
        "name": "info",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "biography",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Clan",
        "kind": "LinkedField",
        "name": "clan",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "humanity",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "stage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "approved",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isComplete",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isNpc",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "getCharacterQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getCharacterQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "f2093304faceb878806a9326187de331",
    "id": null,
    "metadata": {},
    "name": "getCharacterQuery",
    "operationKind": "query",
    "text": "query getCharacterQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    info {\n      id\n      name\n      avatar\n    }\n    biography\n    description\n    clan {\n      id\n      name\n    }\n    humanity\n    stage\n    approved\n    isComplete\n    isNpc\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'fbba50f7c2d9fa98b0c6ff34a1dcc668';
module.exports = node;
