/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatQueriesMainMapsQueryVariables = {||};
export type chatQueriesMainMapsQueryResponse = {|
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
export type chatQueriesMainMapsQuery = {|
  variables: chatQueriesMainMapsQueryVariables,
  response: chatQueriesMainMapsQueryResponse,
|};
*/


/*
query chatQueriesMainMapsQuery {
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

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "chatQueriesMainMapsQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "chatQueriesMainMapsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d0e1e7d6a09e1bd1c99cd35340574368",
    "id": null,
    "metadata": {},
    "name": "chatQueriesMainMapsQuery",
    "operationKind": "query",
    "text": "query chatQueriesMainMapsQuery {\n  mainMaps {\n    id\n    name\n    description\n    childs {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '986e4ad80cba02e0651495aff4e9ef02';

module.exports = node;
