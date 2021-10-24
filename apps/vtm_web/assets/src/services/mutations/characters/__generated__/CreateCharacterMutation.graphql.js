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
  clanId: string,
  description: string,
  isNpc?: ?number,
  name: string,
|};
export type CreateCharacterMutationVariables = {|
  request: CharacterCreationRequest
|};
export type CreateCharacterMutationResponse = {|
  +createCharacter: ?{|
    +id: string,
    +name: ?string,
    +clan: ?{|
      +name: ?string
    |},
  |}
|};
export type CreateCharacterMutation = {|
  variables: CreateCharacterMutationVariables,
  response: CreateCharacterMutationResponse,
|};


/*
mutation CreateCharacterMutation(
  $request: CharacterCreationRequest!
) {
  createCharacter(request: $request) {
    id
    name
    clan {
      name
      id
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
    "kind": "Variable",
    "name": "request",
    "variableName": "request"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateCharacterMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "createCharacter",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Clan",
            "kind": "LinkedField",
            "name": "clan",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateCharacterMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "createCharacter",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Clan",
            "kind": "LinkedField",
            "name": "clan",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3138415b785e72a32239966c75c1be08",
    "id": null,
    "metadata": {},
    "name": "CreateCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation CreateCharacterMutation(\n  $request: CharacterCreationRequest!\n) {\n  createCharacter(request: $request) {\n    id\n    name\n    clan {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'd216c8a328394a57c20c43f54ad79746';
module.exports = node;
