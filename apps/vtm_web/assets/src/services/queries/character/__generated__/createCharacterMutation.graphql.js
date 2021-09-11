/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CharacterCreationRequest = {|
  avatar?: ?string,
  biography: string,
  chatAvatar?: ?string,
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
    +info: ?{|
      +id: ?string,
      +name: ?string,
    |},
    +clan: ?{|
      +id: ?string,
      +name: ?string,
    |},
  |}
|};
export type createCharacterMutation = {|
  variables: createCharacterMutationVariables,
  response: createCharacterMutationResponse,
|};


/*
mutation createCharacterMutation(
  $request: CharacterCreationRequest!
) {
  createCharacter(request: $request) {
    info {
      id
      name
    }
    clan {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "request"
  }
],
v1 = [
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
v2 = [
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
      {
        "alias": null,
        "args": null,
        "concreteType": "CharacterInfo",
        "kind": "LinkedField",
        "name": "info",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Clan",
        "kind": "LinkedField",
        "name": "clan",
        "plural": false,
        "selections": (v1/*: any*/),
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
    "name": "createCharacterMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createCharacterMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "80a00be936bcd6c95495831032cf714b",
    "id": null,
    "metadata": {},
    "name": "createCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation createCharacterMutation(\n  $request: CharacterCreationRequest!\n) {\n  createCharacter(request: $request) {\n    info {\n      id\n      name\n    }\n    clan {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5575f521777d6bf2d4886623f1c4b4d7';
module.exports = node;
