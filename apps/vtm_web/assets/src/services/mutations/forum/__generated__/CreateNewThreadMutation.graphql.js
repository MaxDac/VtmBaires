/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CreateNewThreadRequest = {|
  creatorCharacterId?: ?string,
  creatorUserId: string,
  description?: ?string,
  sectionId: string,
  title: string,
|};
export type CreateNewThreadMutationVariables = {|
  request: CreateNewThreadRequest
|};
export type CreateNewThreadMutationResponse = {|
  +newForumThread: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type CreateNewThreadMutation = {|
  variables: CreateNewThreadMutationVariables,
  response: CreateNewThreadMutationResponse,
|};


/*
mutation CreateNewThreadMutation(
  $request: CreateNewThreadRequest!
) {
  newForumThread(input: {request: $request}) {
    result {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "request"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "request",
            "variableName": "request"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "NewForumThreadPayload",
    "kind": "LinkedField",
    "name": "newForumThread",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ForumThread",
        "kind": "LinkedField",
        "name": "result",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
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
    "name": "CreateNewThreadMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateNewThreadMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5ae30d0e01c791e0a5331bc5c04b196d",
    "id": null,
    "metadata": {},
    "name": "CreateNewThreadMutation",
    "operationKind": "mutation",
    "text": "mutation CreateNewThreadMutation(\n  $request: CreateNewThreadRequest!\n) {\n  newForumThread(input: {request: $request}) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'bf45a963e9bd6708d9c1707b372b6008';
module.exports = node;
