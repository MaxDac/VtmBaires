/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetMessageQueryVariables = {|
  messageId: string
|};
export type GetMessageQueryResponse = {|
  +getMessage: ?{|
    +id: string,
    +subject: string,
    +senderUser: {|
      +id: string,
      +name: ?string,
    |},
    +receiverUser: {|
      +id: string,
      +name: ?string,
    |},
    +senderCharacter: ?{|
      +id: string,
      +name: ?string,
      +chatAvatar: ?string,
    |},
    +receiverCharacter: ?{|
      +id: string,
      +name: ?string,
      +chatAvatar: ?string,
    |},
    +senderUserId: string,
    +senderCharacterId: ?string,
    +receiverUserId: string,
    +receiverCharacterId: ?string,
    +text: string,
    +read: ?boolean,
    +onGame: ?boolean,
    +insertedAt: ?any,
    +modifiedAt: ?any,
  |}
|};
export type GetMessageQuery = {|
  variables: GetMessageQueryVariables,
  response: GetMessageQueryResponse,
|};


/*
query GetMessageQuery(
  $messageId: ID!
) {
  getMessage(messageId: $messageId) {
    id
    subject
    senderUser {
      id
      name
    }
    receiverUser {
      id
      name
    }
    senderCharacter {
      id
      name
      chatAvatar
    }
    receiverCharacter {
      id
      name
      chatAvatar
    }
    senderUserId
    senderCharacterId
    receiverUserId
    receiverCharacterId
    text
    read
    onGame
    insertedAt
    modifiedAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "messageId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "chatAvatar",
    "storageKey": null
  }
],
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "messageId",
        "variableName": "messageId"
      }
    ],
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "getMessage",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "receiverUser",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "senderCharacter",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "receiverCharacter",
        "plural": false,
        "selections": (v4/*: any*/),
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
        "name": "text",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetMessageQuery",
    "selections": (v5/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetMessageQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "0c925cf5cad301926ba18f24701fe6c3",
    "id": null,
    "metadata": {},
    "name": "GetMessageQuery",
    "operationKind": "query",
    "text": "query GetMessageQuery(\n  $messageId: ID!\n) {\n  getMessage(messageId: $messageId) {\n    id\n    subject\n    senderUser {\n      id\n      name\n    }\n    receiverUser {\n      id\n      name\n    }\n    senderCharacter {\n      id\n      name\n      chatAvatar\n    }\n    receiverCharacter {\n      id\n      name\n      chatAvatar\n    }\n    senderUserId\n    senderCharacterId\n    receiverUserId\n    receiverCharacterId\n    text\n    read\n    onGame\n    insertedAt\n    modifiedAt\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '42ae2747ce7a1476172d87cc477f5a3e';
module.exports = node;
