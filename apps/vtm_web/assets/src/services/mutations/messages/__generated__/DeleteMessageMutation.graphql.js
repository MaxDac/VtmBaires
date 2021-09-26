/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type DeleteMessageMutationVariables = {|
  id: string
|};
export type DeleteMessageMutationResponse = {|
  +deleteMessage: ?{|
    +id: string
  |}
|};
export type DeleteMessageMutation = {|
  variables: DeleteMessageMutationVariables,
  response: DeleteMessageMutationResponse,
|};


/*
mutation DeleteMessageMutation(
  $id: ID!
) {
  deleteMessage(messageId: $id) {
    id
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
        "name": "messageId",
        "variableName": "id"
      }
    ],
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "deleteMessage",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteMessageMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8f17e9e68297a727e92a0398ed85a1ce",
    "id": null,
    "metadata": {},
    "name": "DeleteMessageMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteMessageMutation(\n  $id: ID!\n) {\n  deleteMessage(messageId: $id) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '56af8b72b69a611e40f9a69fdab6fedd';
module.exports = node;
