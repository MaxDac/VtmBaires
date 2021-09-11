/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type sessionQueryVariables = {||};
export type sessionQueryResponse = {|
  +list: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
  |}>
|};
export type sessionQuery = {|
  variables: sessionQueryVariables,
  response: sessionQueryResponse,
|};


/*
query sessionQuery {
  list {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Player",
    "kind": "LinkedField",
    "name": "list",
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
    "name": "sessionQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "sessionQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0b679a37b3867daa78529a09e2e40c21",
    "id": null,
    "metadata": {},
    "name": "sessionQuery",
    "operationKind": "query",
    "text": "query sessionQuery {\n  list {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'b1435a2c04686d739f00a970a8801b1b';
module.exports = node;
