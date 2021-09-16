/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UserCharactersQueryVariables = {||};
export type UserCharactersQueryResponse = {|
  +me: ?{|
    +userCharacters: ?$ReadOnlyArray<?{|
      +id: string,
      +name: ?string,
      +stage: ?number,
      +approved: ?boolean,
      +isComplete: ?boolean,
      +chatAvatar: ?string,
    |}>
  |}
|};
export type UserCharactersQuery = {|
  variables: UserCharactersQueryVariables,
  response: UserCharactersQueryResponse,
|};


/*
query UserCharactersQuery {
  me {
    userCharacters {
      id
      name
      stage
      approved
      isComplete
      chatAvatar
    }
    id
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
  "concreteType": "Character",
  "kind": "LinkedField",
  "name": "userCharacters",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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
      "name": "chatAvatar",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserCharactersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
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
    "name": "UserCharactersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e06d1a6cdb5c0424fdaaa3c73dbddc90",
    "id": null,
    "metadata": {},
    "name": "UserCharactersQuery",
    "operationKind": "query",
    "text": "query UserCharactersQuery {\n  me {\n    userCharacters {\n      id\n      name\n      stage\n      approved\n      isComplete\n      chatAvatar\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '88d5aaa524fc69e239a093c43c38c0da';
module.exports = node;
