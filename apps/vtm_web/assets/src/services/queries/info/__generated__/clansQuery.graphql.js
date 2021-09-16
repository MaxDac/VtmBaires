/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ClansQueryVariables = {||};
export type ClansQueryResponse = {|
  +clans: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
  |}>
|};
export type ClansQuery = {|
  variables: ClansQueryVariables,
  response: ClansQueryResponse,
|};


/*
query ClansQuery {
  clans {
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
    "concreteType": "Clan",
    "kind": "LinkedField",
    "name": "clans",
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
    "name": "ClansQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ClansQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5ec2f2915ee3452739b6f25fffd168db",
    "id": null,
    "metadata": {},
    "name": "ClansQuery",
    "operationKind": "query",
    "text": "query ClansQuery {\n  clans {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'cc2ae0cc65cad046bfe119b51025129a';
module.exports = node;
