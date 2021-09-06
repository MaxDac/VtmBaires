/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type clansQueryVariables = {||};
export type clansQueryResponse = {|
  +clans: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
  |}>
|};
export type clansQuery = {|
  variables: clansQueryVariables,
  response: clansQueryResponse,
|};
*/


/*
query clansQuery {
  clans {
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
    "name": "clansQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "clansQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5a3e1e19f6e21b38cf7a29113efb4a67",
    "id": null,
    "metadata": {},
    "name": "clansQuery",
    "operationKind": "query",
    "text": "query clansQuery {\n  clans {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '64f15ec539fdcd78ae77e104a51069b8';

module.exports = node;
