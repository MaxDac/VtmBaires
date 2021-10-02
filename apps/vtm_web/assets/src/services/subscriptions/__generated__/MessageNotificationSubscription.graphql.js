/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MessageNotificationSubscriptionVariables = {|
  token: string
|};
export type MessageNotificationSubscriptionResponse = {|
  +newMessageNotification: ?{|
    +message: ?{|
      +id: string,
      +subject: string,
      +senderName: ?string,
    |},
    +numberUnread: ?number,
  |}
|};
export type MessageNotificationSubscription = {|
  variables: MessageNotificationSubscriptionVariables,
  response: MessageNotificationSubscriptionResponse,
|};


/*
subscription MessageNotificationSubscription(
  $token: String!
) {
  newMessageNotification(token: $token) {
    message {
      id
      subject
      senderName
    }
    numberUnread
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "MessageNotification",
    "kind": "LinkedField",
    "name": "newMessageNotification",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "message",
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
            "name": "subject",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "senderName",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "numberUnread",
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
    "name": "MessageNotificationSubscription",
    "selections": (v1/*: any*/),
    "type": "RootSubscriptionType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageNotificationSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "39f486dfd8c84fe26d58e5f1ac179147",
    "id": null,
    "metadata": {},
    "name": "MessageNotificationSubscription",
    "operationKind": "subscription",
    "text": "subscription MessageNotificationSubscription(\n  $token: String!\n) {\n  newMessageNotification(token: $token) {\n    message {\n      id\n      subject\n      senderName\n    }\n    numberUnread\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5333bef93acee32190828c43440635e0';
module.exports = node;
