/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetForumThreadsQueryVariables = {|
  forumSectionId: string
|};
export type GetForumThreadsQueryResponse = {|
  +getForumThreads: ?$ReadOnlyArray<?{|
    +id: string,
    +forumSection: ?{|
      +id: string
    |},
    +title: ?string,
    +description: ?string,
    +creatorName: ?string,
    +insertedAt: ?any,
    +updatedAt: ?any,
  |}>
|};
export type GetForumThreadsQuery = {|
  variables: GetForumThreadsQueryVariables,
  response: GetForumThreadsQueryResponse,
|};


/*
query GetForumThreadsQuery(
  $forumSectionId: ID!
) {
  getForumThreads(forumSectionId: $forumSectionId) {
    id
    forumSection {
      id
    }
    title
    description
    creatorName
    insertedAt
    updatedAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "forumSectionId"
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
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "forumSectionId",
        "variableName": "forumSectionId"
      }
    ],
    "concreteType": "ForumThread",
    "kind": "LinkedField",
    "name": "getForumThreads",
    "plural": true,
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetForumThreadsQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetForumThreadsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "2465e6838a222e1d5cc567c0fc674721",
    "id": null,
    "metadata": {},
    "name": "GetForumThreadsQuery",
    "operationKind": "query",
    "text": "query GetForumThreadsQuery(\n  $forumSectionId: ID!\n) {\n  getForumThreads(forumSectionId: $forumSectionId) {\n    id\n    forumSection {\n      id\n    }\n    title\n    description\n    creatorName\n    insertedAt\n    updatedAt\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'c122fd55763da85dda3f9d3c5ab8af3e';
module.exports = node;
