/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatQueriesMapQueryVariables = {|
  id: string
|};
export type chatQueriesMapQueryResponse = {|
  +map: ?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
    +image: ?string,
    +isChat: ?boolean,
  |}
|};
export type chatQueriesMapQuery = {|
  variables: chatQueriesMapQueryVariables,
  response: chatQueriesMapQueryResponse,
|};
*/


/*
query chatQueriesMapQuery(
  $id: ID!
) {
  map(id: $id) {
    id
    name
    description
    image
    isChat
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "ChatLocation",
    "kind": "LinkedField",
    "name": "map",
    "plural": false,
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
        "name": "name",
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
        "name": "image",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isChat",
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
    "name": "chatQueriesMapQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatQueriesMapQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6d51fb3b8d831a9038727d5f83edfdeb",
    "id": null,
    "metadata": {},
    "name": "chatQueriesMapQuery",
    "operationKind": "query",
    "text": "query chatQueriesMapQuery(\n  $id: ID!\n) {\n  map(id: $id) {\n    id\n    name\n    description\n    image\n    isChat\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a8189b71b60efc4375424e3baa3a5426';

module.exports = node;
