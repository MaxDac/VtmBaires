/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetCharacterStatusQueryVariables = {|
  characterId: string
|};
export type GetCharacterStatusQueryResponse = {|
  +getCharacterStatus: ?{|
    +id: string,
    +bloodPotency: ?number,
    +hunger: ?number,
    +health: ?number,
    +damage: ?number,
    +aggravatedDamage: ?number,
    +willpower: ?number,
    +willpowerDamage: ?number,
  |}
|};
export type GetCharacterStatusQuery = {|
  variables: GetCharacterStatusQueryVariables,
  response: GetCharacterStatusQueryResponse,
|};


/*
query GetCharacterStatusQuery(
  $characterId: ID!
) {
  getCharacterStatus(characterId: $characterId) {
    id
    bloodPotency
    hunger
    health
    damage
    aggravatedDamage
    willpower
    willpowerDamage
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "characterId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "characterId",
        "variableName": "characterId"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "getCharacterStatus",
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
        "name": "bloodPotency",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hunger",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "health",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "damage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "aggravatedDamage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "willpower",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "willpowerDamage",
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
    "name": "GetCharacterStatusQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCharacterStatusQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "70bf94bcc237c65e8d8811cfbc793e53",
    "id": null,
    "metadata": {},
    "name": "GetCharacterStatusQuery",
    "operationKind": "query",
    "text": "query GetCharacterStatusQuery(\n  $characterId: ID!\n) {\n  getCharacterStatus(characterId: $characterId) {\n    id\n    bloodPotency\n    hunger\n    health\n    damage\n    aggravatedDamage\n    willpower\n    willpowerDamage\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '028c8d675363e3338a7dacec1ce7f9df';
module.exports = node;
