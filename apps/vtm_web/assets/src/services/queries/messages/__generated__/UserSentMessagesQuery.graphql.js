/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UserSentMessagesQueryVariables = {||};
export type UserSentMessagesQueryResponse = {|
  +me: ?{|
    +sentMessages: ?$ReadOnlyArray<?{|
      +id: string,
      +subject: string,
      +receiverUser: {|
        +id: string,
        +name: ?string,
      |},
      +receiverCharacter: ?{|
        +id: string,
        +name: ?string,
      |},
      +receiverUserId: string,
      +receiverCharacterId: ?string,
      +read: ?boolean,
      +onGame: ?boolean,
      +insertedAt: ?any,
      +modifiedAt: ?any,
    |}>
  |}
|};
export type UserSentMessagesQuery = {|
  variables: UserSentMessagesQueryVariables,
  response: UserSentMessagesQueryResponse,
|};


/*
query UserSentMessagesQuery {
  me {
    sentMessages {
      id
      subject
      receiverUser {
        id
        name
      }
      receiverCharacter {
        id
        name
      }
      receiverUserId
      receiverCharacterId
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
  "name": "sentMessages",
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
      "name": "receiverUser",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "receiverCharacter",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "receiverUserId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "receiverCharacterId",
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
    "name": "UserSentMessagesQuery",
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
    "name": "UserSentMessagesQuery",
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
    "cacheID": "a51f661735322fcc4dc9bbc8a0b7dcfd",
    "id": null,
    "metadata": {},
    "name": "UserSentMessagesQuery",
    "operationKind": "query",
    "text": "query UserSentMessagesQuery {\n  me {\n    sentMessages {\n      id\n      subject\n      receiverUser {\n        id\n        name\n      }\n      receiverCharacter {\n        id\n        name\n      }\n      receiverUserId\n      receiverCharacterId\n      read\n      onGame\n      insertedAt\n      modifiedAt\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '63106711a2bfbe92e366845bb16ed95f';
module.exports = node;
