/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ClanDisciplinesQueryVariables = {|
  clanId: string
|};
export type ClanDisciplinesQueryResponse = {|
  +clanDisciplines: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +description: ?string,
  |}>
|};
export type ClanDisciplinesQuery = {|
  variables: ClanDisciplinesQueryVariables,
  response: ClanDisciplinesQueryResponse,
|};


/*
query ClanDisciplinesQuery(
  $clanId: ID!
) {
  clanDisciplines(clanId: $clanId) {
    id
    name
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clanId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "clanId",
        "variableName": "clanId"
      }
    ],
    "concreteType": "Discipline",
    "kind": "LinkedField",
    "name": "clanDisciplines",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "name": "ClanDisciplinesQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClanDisciplinesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "64f73bdb1ec9cb744b86796127fef8ef",
    "id": null,
    "metadata": {},
    "name": "ClanDisciplinesQuery",
    "operationKind": "query",
    "text": "query ClanDisciplinesQuery(\n  $clanId: ID!\n) {\n  clanDisciplines(clanId: $clanId) {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '1a39a6474448b402af1e5ba20e6e63ce';
module.exports = node;
