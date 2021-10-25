/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetForumThreadPostsQueryVariables = {|
  forumThreadId: string,
  pageSize: number,
  page: number,
|};
export type GetForumThreadPostsQueryResponse = {|
  +getForumThreadPosts: ?$ReadOnlyArray<?{|
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
    +onGame: ?boolean,
    +insertedAt: ?any,
    +updatedAt: ?any,
  |}>
|};
export type GetForumThreadPostsQuery = {|
  variables: GetForumThreadPostsQueryVariables,
  response: GetForumThreadPostsQueryResponse,
|};


/*
query GetForumThreadPostsQuery(
  $forumThreadId: ID!
  $pageSize: Int!
  $page: Int!
) {
  getForumThreadPosts(id: $forumThreadId, pageSize: $pageSize, page: $page) {
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
    onGame
    insertedAt
    updatedAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "forumThreadId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageSize"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "forumThreadId"
      },
      {
        "kind": "Variable",
        "name": "page",
        "variableName": "page"
      },
      {
        "kind": "Variable",
        "name": "pageSize",
        "variableName": "pageSize"
      }
    ],
    "concreteType": "ForumPost",
    "kind": "LinkedField",
    "name": "getForumThreadPosts",
    "plural": true,
    "selections": [
      (v3/*: any*/),
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
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": (v4/*: any*/),
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
        "name": "updatedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetForumThreadPostsQuery",
    "selections": (v5/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "GetForumThreadPostsQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "ae3f2c2d7b1ff882ac61a0257384d8c9",
    "id": null,
    "metadata": {},
    "name": "GetForumThreadPostsQuery",
    "operationKind": "query",
    "text": "query GetForumThreadPostsQuery(\n  $forumThreadId: ID!\n  $pageSize: Int!\n  $page: Int!\n) {\n  getForumThreadPosts(id: $forumThreadId, pageSize: $pageSize, page: $page) {\n    id\n    text\n    character {\n      id\n      name\n    }\n    user {\n      id\n      name\n    }\n    onGame\n    insertedAt\n    updatedAt\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '27e0518d7e8a66ffc3d1fca1dce2366b';
module.exports = node;
