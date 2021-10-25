/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetForumThreadsQueryVariables = {|
  forumSectionId: string,
  pageSize: number,
  page: number,
|};
export type GetForumThreadsQueryResponse = {|
  +getForumThreads: ?{|
    +threadCount: ?number,
    +threads: ?$ReadOnlyArray<?{|
      +id: string,
      +forumSection: ?{|
        +id: string
      |},
      +creatorUser: ?{|
        +id: string,
        +name: ?string,
      |},
      +creatorCharacter: ?{|
        +id: string,
        +name: ?string,
      |},
      +title: ?string,
      +description: ?string,
      +insertedAt: ?any,
      +updatedAt: ?any,
    |}>,
  |}
|};
export type GetForumThreadsQuery = {|
  variables: GetForumThreadsQueryVariables,
  response: GetForumThreadsQueryResponse,
|};


/*
query GetForumThreadsQuery(
  $forumSectionId: ID!
  $pageSize: Int!
  $page: Int!
) {
  getForumThreads(forumSectionId: $forumSectionId, pageSize: $pageSize, page: $page) {
    threadCount
    threads {
      id
      forumSection {
        id
      }
      creatorUser {
        id
        name
      }
      creatorCharacter {
        id
        name
      }
      title
      description
      insertedAt
      updatedAt
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "forumSectionId"
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
        "name": "forumSectionId",
        "variableName": "forumSectionId"
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
    "concreteType": "GetThreadsResponse",
    "kind": "LinkedField",
    "name": "getForumThreads",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "threadCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ForumThread",
        "kind": "LinkedField",
        "name": "threads",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ForumSection",
            "kind": "LinkedField",
            "name": "forumSection",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "creatorUser",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "creatorCharacter",
            "plural": false,
            "selections": (v4/*: any*/),
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetForumThreadsQuery",
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
    "name": "GetForumThreadsQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "57221f41c6ddc4de731220c60dddfc29",
    "id": null,
    "metadata": {},
    "name": "GetForumThreadsQuery",
    "operationKind": "query",
    "text": "query GetForumThreadsQuery(\n  $forumSectionId: ID!\n  $pageSize: Int!\n  $page: Int!\n) {\n  getForumThreads(forumSectionId: $forumSectionId, pageSize: $pageSize, page: $page) {\n    threadCount\n    threads {\n      id\n      forumSection {\n        id\n      }\n      creatorUser {\n        id\n        name\n      }\n      creatorCharacter {\n        id\n        name\n      }\n      title\n      description\n      insertedAt\n      updatedAt\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '38108deb092974bff820c4355067e9fc';
module.exports = node;
