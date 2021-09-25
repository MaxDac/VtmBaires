/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UpdateSessionCharacterMutationVariables = {|
  characterId: string
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
) {
  updateSessionCharacter(characterId: $characterId) {
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
    "cacheID": "f931fdf0662e641cce717ae0a6348010",
    "id": null,
    "metadata": {},
    "name": "UpdateSessionCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateSessionCharacterMutation(\n  $characterId: ID!\n) {\n  updateSessionCharacter(characterId: $characterId) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'f7ed2998d3009d29e2486fb2e83ab544';
module.exports = node;
