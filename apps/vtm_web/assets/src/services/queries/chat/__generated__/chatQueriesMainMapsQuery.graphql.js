/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatQueriesMainMapsQueryVariables = {||};
export type ChatQueriesMainMapsQueryResponse = {|
  +mainMaps: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
    +childs: ?$ReadOnlyArray<?{|
      +id: ?string,
      +name: ?string,
    |}>,
  |}>
|};
export type ChatQueriesMainMapsQuery = {|
  variables: ChatQueriesMainMapsQueryVariables,
  response: ChatQueriesMainMapsQueryResponse,
|};


/*
query ChatQueriesMainMapsQuery {
  mainMaps {
    id
    name
    description
    childs {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ChatLocation",
    "kind": "LinkedField",
    "name": "mainMaps",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
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
        "concreteType": "ChatLocation",
        "kind": "LinkedField",
        "name": "childs",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
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
    "name": "ChatQueriesMainMapsQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ChatQueriesMainMapsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "14c4b2f6f82a26b4d4e4f3d3bbbba753",
    "id": null,
    "metadata": {},
    "name": "ChatQueriesMainMapsQuery",
    "operationKind": "query",
    "text": "query ChatQueriesMainMapsQuery {\n  mainMaps {\n    id\n    name\n    description\n    childs {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '10e81a25fdcfde6828e48f093e8efc49';
module.exports = node;
