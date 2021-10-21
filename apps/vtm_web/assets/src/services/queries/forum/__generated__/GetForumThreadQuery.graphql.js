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
    +thread: ?{|
      +id: string,
      +forumSection: ?{|
        +id: string
      |},
      +title: ?string,
      +description: ?string,
      +creatorName: ?string,
    |},
    +posts: ?$ReadOnlyArray<?{|
      +id: string,
      +text: ?string,
      +character: ?{|
        +id: string,
        +name: ?string,
      |},
      +user: ?{|
        +id: string,
        +name: ?string,
      |},
      +insertedAt: ?any,
      +updatedAt: ?any,
    |}>,
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
    thread {
      id
      forumSection {
        id
      }
      title
      description
      creatorName
    }
    posts {
      id
      text
      character {
        id
        name
      }
      user {
        id
        name
      }
      insertedAt
      updatedAt
    }
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
    "concreteType": "ForumThreadPage",
    "kind": "LinkedField",
    "name": "getForumThread",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ForumThread",
        "kind": "LinkedField",
        "name": "thread",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "creatorName",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ForumPost",
        "kind": "LinkedField",
        "name": "posts",
        "plural": true,
        "selections": [
          (v1/*: any*/),
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
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": (v2/*: any*/),
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
            "name": "updatedAt",
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
    "cacheID": "9878f18cc623e58abf87a5e6dff29f40",
    "id": null,
    "metadata": {},
    "name": "GetForumThreadQuery",
    "operationKind": "query",
    "text": "query GetForumThreadQuery(\n  $forumThreadId: ID!\n) {\n  getForumThread(id: $forumThreadId) {\n    thread {\n      id\n      forumSection {\n        id\n      }\n      title\n      description\n      creatorName\n    }\n    posts {\n      id\n      text\n      character {\n        id\n        name\n      }\n      user {\n        id\n        name\n      }\n      insertedAt\n      updatedAt\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '116a0a86af5f7cc72c670c2b3c43b5f3';
module.exports = node;
