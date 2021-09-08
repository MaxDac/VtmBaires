/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type predatorTypesQueryVariables = {||};
export type predatorTypesQueryResponse = {|
  +predatorTypes: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
  |}>
|};
export type predatorTypesQuery = {|
  variables: predatorTypesQueryVariables,
  response: predatorTypesQueryResponse,
|};
*/


/*
query predatorTypesQuery {
  predatorTypes {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PredatorType",
    "kind": "LinkedField",
    "name": "predatorTypes",
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
        "name": "name",
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
    "name": "predatorTypesQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "predatorTypesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "65b38cb08a1a41f1c375293c0d509331",
    "id": null,
    "metadata": {},
    "name": "predatorTypesQuery",
    "operationKind": "query",
    "text": "query predatorTypesQuery {\n  predatorTypes {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'db4025bb28fdaedb7c32f820f98d0c3b';

module.exports = node;
