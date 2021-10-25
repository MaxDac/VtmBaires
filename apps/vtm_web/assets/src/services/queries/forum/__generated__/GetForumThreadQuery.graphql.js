/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetForumThreadQueryVariables = {|
  forumThreadId: string
|};
export type GetForumThreadQueryResponse = {|
  +getForumThread: ?{|
    +id: string,
    +forumSection: ?{|
      +id: string
    |},
    +creatorCharacter: ?{|
      +id: string,
      +name: ?string,
    |},
    +creatorUser: ?{|
      +id: string,
      +name: ?string,
    |},
    +onGame: ?boolean,
    +postCount: ?number,
    +title: ?string,
    +description: ?string,
  |}
|};
export type GetForumThreadQuery = {|
  variables: GetForumThreadQueryVariables,
  response: GetForumThreadQueryResponse,
|};


/*
query GetForumThreadQuery(
  $forumThreadId: ID!
) {
  getForumThread(id: $forumThreadId) {
    id
    forumSection {
      id
    }
    creatorCharacter {
      id
      name
    }
    creatorUser {
      id
      name
    }
    onGame
    postCount
    title
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "forumThreadId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "forumThreadId"
      }
    ],
    "concreteType": "ForumThread",
    "kind": "LinkedField",
    "name": "getForumThread",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ForumSection",
        "kind": "LinkedField",
        "name": "forumSection",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "creatorCharacter",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "creatorUser",
        "plural": false,
        "selections": (v2/*: any*/),
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
        "name": "postCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "name": "GetForumThreadQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetForumThreadQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "0e1bfc7a194f83fc5905c31ec6f75827",
    "id": null,
    "metadata": {},
    "name": "GetForumThreadQuery",
    "operationKind": "query",
    "text": "query GetForumThreadQuery(\n  $forumThreadId: ID!\n) {\n  getForumThread(id: $forumThreadId) {\n    id\n    forumSection {\n      id\n    }\n    creatorCharacter {\n      id\n      name\n    }\n    creatorUser {\n      id\n      name\n    }\n    onGame\n    postCount\n    title\n    description\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '79c4102671017b9ff060ec3bdf2cd627';
module.exports = node;
