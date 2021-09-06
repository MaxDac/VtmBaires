/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CharacterCreationRequest = {|
  biography: string,
  clanId: number,
  description: string,
  isNpc?: ?number,
  name: string,
|};
export type createCharacterMutationVariables = {|
  request: CharacterCreationRequest
|};
export type createCharacterMutationResponse = {|
  +createCharacter: ?{|
    +id: ?string,
    +clan: ?{|
      +id: ?string,
      +name: ?string,
    |},
    +name: ?string,
  |}
|};
export type createCharacterMutation = {|
  variables: createCharacterMutationVariables,
  response: createCharacterMutationResponse,
|};
*/


/*
mutation createCharacterMutation(
  $request: CharacterCreationRequest!
) {
  createCharacter(request: $request) {
    id
    clan {
      id
      name
    }
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "request"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "request",
        "variableName": "request"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "createCharacter",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Clan",
        "kind": "LinkedField",
        "name": "clan",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      (v2/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createCharacterMutation",
    "selections": (v3/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createCharacterMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "f7b0986a2aec541e3480562c12812c66",
    "id": null,
    "metadata": {},
    "name": "createCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation createCharacterMutation(\n  $request: CharacterCreationRequest!\n) {\n  createCharacter(request: $request) {\n    id\n    clan {\n      id\n      name\n    }\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0d6a1d9395b1597a178a8bd2d325fe24';

module.exports = node;
