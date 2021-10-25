/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetForumSectionsQueryVariables = {||};
export type GetForumSectionsQueryResponse = {|
  +getForumSections: ?$ReadOnlyArray<?{|
    +id: string,
    +title: ?string,
    +description: ?string,
    +onGame: ?boolean,
    +canView: ?boolean,
    +canEdit: ?boolean,
    +insertedAt: ?any,
    +updatedAt: ?any,
  |}>
|};
export type GetForumSectionsQuery = {|
  variables: GetForumSectionsQueryVariables,
  response: GetForumSectionsQueryResponse,
|};


/*
query GetForumSectionsQuery {
  getForumSections {
    id
    title
    description
    onGame
    canView
    canEdit
    insertedAt
    updatedAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ForumSection",
    "kind": "LinkedField",
    "name": "getForumSections",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
        "name": "onGame",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "canView",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "canEdit",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetForumSectionsQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetForumSectionsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e251570f1d117160d8e514cfe1e4ee88",
    "id": null,
    "metadata": {},
    "name": "GetForumSectionsQuery",
    "operationKind": "query",
    "text": "query GetForumSectionsQuery {\n  getForumSections {\n    id\n    title\n    description\n    onGame\n    canView\n    canEdit\n    insertedAt\n    updatedAt\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '67ac3125c24a5c798393f66eaf8810a3';
module.exports = node;
