/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AllUsersQueryVariables = {||};
export type AllUsersQueryResponse = {|
  +allUsers: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
  |}>
|};
export type AllUsersQuery = {|
  variables: AllUsersQueryVariables,
  response: AllUsersQueryResponse,
|};


/*
query AllUsersQuery {
  allUsers {
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "allUsers",
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
    "name": "AllUsersQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AllUsersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "626e117d25014fa9f82a8b347a9a9c28",
    "id": null,
    "metadata": {},
    "name": "AllUsersQuery",
    "operationKind": "query",
    "text": "query AllUsersQuery {\n  allUsers {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '398d04e420f337f556bec68e80cc269a';
module.exports = node;
