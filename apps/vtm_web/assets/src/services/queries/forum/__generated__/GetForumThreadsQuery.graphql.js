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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetForumThreadsQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetForumThreadsQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "6284d6d4c662a8c54217356e75daf260",
    "id": null,
    "metadata": {},
    "name": "GetForumThreadsQuery",
    "operationKind": "query",
    "text": "query GetForumThreadsQuery(\n  $forumSectionId: ID!\n) {\n  getForumThreads(forumSectionId: $forumSectionId) {\n    id\n    forumSection {\n      id\n    }\n    creatorUser {\n      id\n      name\n    }\n    creatorCharacter {\n      id\n      name\n    }\n    title\n    description\n    insertedAt\n    updatedAt\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '06494a5162422564aaeceac43ad4de95';
module.exports = node;
