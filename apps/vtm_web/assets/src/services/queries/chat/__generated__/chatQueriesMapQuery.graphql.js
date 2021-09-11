/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatQueriesMapQueryVariables = {|
  id: string
|};
export type ChatQueriesMapQueryResponse = {|
  +map: ?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
    +image: ?string,
    +isChat: ?boolean,
  |}
|};
export type ChatQueriesMapQuery = {|
  variables: ChatQueriesMapQueryVariables,
  response: ChatQueriesMapQueryResponse,
|};


/*
query ChatQueriesMapQuery(
  $id: ID!
) {
  map(id: $id) {
    id
    name
    description
    image
    isChat
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
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "ChatLocation",
    "kind": "LinkedField",
    "name": "map",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isChat",
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
    "name": "ChatQueriesMapQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatQueriesMapQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "99e3448a2af6bb7cfb040f0d8641a839",
    "id": null,
    "metadata": {},
    "name": "ChatQueriesMapQuery",
    "operationKind": "query",
    "text": "query ChatQueriesMapQuery(\n  $id: ID!\n) {\n  map(id: $id) {\n    id\n    name\n    description\n    image\n    isChat\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'cfe076dae1a46d816d114243e50a58a4';
module.exports = node;
