/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CreateNewPostRequest = {|
  creatorCharacterId?: ?string,
  creatorUserId: string,
  forumThreadId: string,
  text?: ?string,
|};
export type CreateNewPostMutationVariables = {|
  request: CreateNewPostRequest
|};
export type CreateNewPostMutationResponse = {|
  +newForumPost: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type CreateNewPostMutation = {|
  variables: CreateNewPostMutationVariables,
  response: CreateNewPostMutationResponse,
|};


/*
mutation CreateNewPostMutation(
  $request: CreateNewPostRequest!
) {
  newForumPost(input: {request: $request}) {
    result {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "request"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "request",
            "variableName": "request"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "NewForumPostPayload",
    "kind": "LinkedField",
    "name": "newForumPost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ForumPost",
        "kind": "LinkedField",
        "name": "result",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "CreateNewPostMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateNewPostMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b5c6bb4df9aa7c4346187b25a552a476",
    "id": null,
    "metadata": {},
    "name": "CreateNewPostMutation",
    "operationKind": "mutation",
    "text": "mutation CreateNewPostMutation(\n  $request: CreateNewPostRequest!\n) {\n  newForumPost(input: {request: $request}) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '16fbe351730c7462644a152f95552135';
module.exports = node;
