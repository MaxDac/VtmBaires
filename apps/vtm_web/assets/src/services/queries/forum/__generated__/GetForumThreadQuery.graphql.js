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
      +creatorName: ?string,
      +creatorAvatar: ?string,
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
      creatorName
      creatorAvatar
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creatorName",
  "storageKey": null
},
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
          (v2/*: any*/)
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "creatorAvatar",
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
    "cacheID": "46597daf6179346a01b29e8a8b1d9ac2",
    "id": null,
    "metadata": {},
    "name": "GetForumThreadQuery",
    "operationKind": "query",
    "text": "query GetForumThreadQuery(\n  $forumThreadId: ID!\n) {\n  getForumThread(id: $forumThreadId) {\n    thread {\n      id\n      forumSection {\n        id\n      }\n      title\n      description\n      creatorName\n    }\n    posts {\n      id\n      text\n      creatorName\n      creatorAvatar\n      insertedAt\n      updatedAt\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '22e336e8b8471c8684dd25518a897bfe';
module.exports = node;
