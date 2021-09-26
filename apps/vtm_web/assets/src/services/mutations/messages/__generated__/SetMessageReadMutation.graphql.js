/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SetMessageReadMutationVariables = {|
  id: string
|};
export type SetMessageReadMutationResponse = {|
  +setMessageRead: ?{|
    +id: string
  |}
|};
export type SetMessageReadMutation = {|
  variables: SetMessageReadMutationVariables,
  response: SetMessageReadMutationResponse,
|};


/*
mutation SetMessageReadMutation(
  $id: ID!
) {
  setMessageRead(messageId: $id) {
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
    "name": "setMessageRead",
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
    "name": "SetMessageReadMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SetMessageReadMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "32655f59429bedfa25c82dd7632a4aa4",
    "id": null,
    "metadata": {},
    "name": "SetMessageReadMutation",
    "operationKind": "mutation",
    "text": "mutation SetMessageReadMutation(\n  $id: ID!\n) {\n  setMessageRead(messageId: $id) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '3a74f93dab438eed10426af9c6013666';
module.exports = node;
