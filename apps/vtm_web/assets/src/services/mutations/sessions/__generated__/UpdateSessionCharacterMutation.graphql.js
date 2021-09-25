/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UpdateSessionCharacterMutationVariables = {|
  characterId: string,
  characterName: string,
|};
export type UpdateSessionCharacterMutationResponse = {|
  +updateSessionCharacter: ?{|
    +id: string,
    +name: ?string,
  |}
|};
export type UpdateSessionCharacterMutation = {|
  variables: UpdateSessionCharacterMutationVariables,
  response: UpdateSessionCharacterMutationResponse,
|};


/*
mutation UpdateSessionCharacterMutation(
  $characterId: ID!
  $characterName: String!
) {
  updateSessionCharacter(characterId: $characterId, characterName: $characterName) {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "characterId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "characterName"
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
      },
      {
        "kind": "Variable",
        "name": "characterName",
        "variableName": "characterName"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "updateSessionCharacter",
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
    "name": "UpdateSessionCharacterMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateSessionCharacterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8f89a19ae0344f212b05639c7c078589",
    "id": null,
    "metadata": {},
    "name": "UpdateSessionCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateSessionCharacterMutation(\n  $characterId: ID!\n  $characterName: String!\n) {\n  updateSessionCharacter(characterId: $characterId, characterName: $characterName) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'a1569738873dc232c3714d0211eff53d';
module.exports = node;
