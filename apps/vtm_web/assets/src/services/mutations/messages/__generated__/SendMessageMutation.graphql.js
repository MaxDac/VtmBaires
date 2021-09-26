/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SendMessageRequest = {|
  onGame?: ?boolean,
  receiverCharacterId?: ?string,
  receiverUserId: string,
  replyToId?: ?string,
  senderCharacterId?: ?string,
  subject: string,
  text: string,
|};
export type SendMessageMutationVariables = {|
  request: SendMessageRequest
|};
export type SendMessageMutationResponse = {|
  +sendMessage: ?{|
    +id: string
  |}
|};
export type SendMessageMutation = {|
  variables: SendMessageMutationVariables,
  response: SendMessageMutationResponse,
|};


/*
mutation SendMessageMutation(
  $request: SendMessageRequest!
) {
  sendMessage(message: $request) {
    id
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
        "kind": "Variable",
        "name": "message",
        "variableName": "request"
      }
    ],
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "sendMessage",
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
    "name": "SendMessageMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SendMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "36775429761fe4dd383c186b6585ab2b",
    "id": null,
    "metadata": {},
    "name": "SendMessageMutation",
    "operationKind": "mutation",
    "text": "mutation SendMessageMutation(\n  $request: SendMessageRequest!\n) {\n  sendMessage(message: $request) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '9097ac55249e443523322f2586e6d9df';
module.exports = node;
