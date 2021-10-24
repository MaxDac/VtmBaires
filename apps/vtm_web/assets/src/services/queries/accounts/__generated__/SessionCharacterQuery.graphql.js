/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SessionCharacterQueryVariables = {||};
export type SessionCharacterQueryResponse = {|
  +getSessionCharacter: ?{|
    +id: string,
    +name: ?string,
    +approved: ?boolean,
    +clan: ?{|
      +name: ?string
    |},
  |}
|};
export type SessionCharacterQuery = {|
  variables: SessionCharacterQueryVariables,
  response: SessionCharacterQueryResponse,
|};


/*
query SessionCharacterQuery {
  getSessionCharacter {
    id
    name
    approved
    clan {
      name
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approved",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SessionCharacterQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "getSessionCharacter",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Clan",
            "kind": "LinkedField",
            "name": "clan",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SessionCharacterQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "getSessionCharacter",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Clan",
            "kind": "LinkedField",
            "name": "clan",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "91b5be91bb7d2618a840161b664fc139",
    "id": null,
    "metadata": {},
    "name": "SessionCharacterQuery",
    "operationKind": "query",
    "text": "query SessionCharacterQuery {\n  getSessionCharacter {\n    id\n    name\n    approved\n    clan {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'f040d3e0ba17e546ddec069dffde83e1';
module.exports = node;
