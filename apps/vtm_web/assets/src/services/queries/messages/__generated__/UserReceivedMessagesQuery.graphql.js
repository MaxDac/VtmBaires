/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UserReceivedMessagesQueryVariables = {||};
export type UserReceivedMessagesQueryResponse = {|
  +me: ?{|
    +receivedMessages: ?$ReadOnlyArray<?{|
      +id: string,
      +subject: string,
      +senderUser: {|
        +id: string,
        +name: ?string,
      |},
      +senderCharacter: ?{|
        +id: string,
        +name: ?string,
      |},
      +senderUserId: string,
      +senderCharacterId: ?string,
      +read: ?boolean,
      +onGame: ?boolean,
      +insertedAt: ?any,
      +modifiedAt: ?any,
    |}>
  |}
|};
export type UserReceivedMessagesQuery = {|
  variables: UserReceivedMessagesQueryVariables,
  response: UserReceivedMessagesQueryResponse,
|};


/*
query UserReceivedMessagesQuery {
  me {
    receivedMessages {
      id
      subject
      senderUser {
        id
        name
      }
      senderCharacter {
        id
        name
      }
      senderUserId
      senderCharacterId
      read
      onGame
      insertedAt
      modifiedAt
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
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Message",
  "kind": "LinkedField",
  "name": "receivedMessages",
  "plural": true,
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "senderUser",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "senderCharacter",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "senderUserId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "senderCharacterId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "read",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "onGame",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "insertedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "modifiedAt",
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
    "name": "UserReceivedMessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "UserReceivedMessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7919e5353a73deb02e40835e7719f983",
    "id": null,
    "metadata": {},
    "name": "UserReceivedMessagesQuery",
    "operationKind": "query",
    "text": "query UserReceivedMessagesQuery {\n  me {\n    receivedMessages {\n      id\n      subject\n      senderUser {\n        id\n        name\n      }\n      senderCharacter {\n        id\n        name\n      }\n      senderUserId\n      senderCharacterId\n      read\n      onGame\n      insertedAt\n      modifiedAt\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'b6a4b9e4ff7601d0027a4fd05588cccd';
module.exports = node;
