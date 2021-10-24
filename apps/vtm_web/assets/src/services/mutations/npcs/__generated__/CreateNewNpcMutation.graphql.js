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
export type CreateNewNpcMutationVariables = {|
  request: CharacterCreationRequest
|};
export type CreateNewNpcMutationResponse = {|
  +createNpc: ?{|
    +character: ?{|
      +id: string,
      +clan: ?{|
        +name: ?string
      |},
    |}
  |}
|};
export type CreateNewNpcMutation = {|
  variables: CreateNewNpcMutationVariables,
  response: CreateNewNpcMutationResponse,
|};


/*
mutation CreateNewNpcMutation(
  $request: CharacterCreationRequest!
) {
  createNpc(input: {request: $request}) {
    character {
      id
      clan {
        name
        id
      }
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
    "fields": [
      {
        "kind": "Variable",
        "name": "request",
        "variableName": "request"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
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
    "name": "CreateNewNpcMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateNpcPayload",
        "kind": "LinkedField",
        "name": "createNpc",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    "name": "CreateNewNpcMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateNpcPayload",
        "kind": "LinkedField",
        "name": "createNpc",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b21bfcba01fdf719a6e28347a251118e",
    "id": null,
    "metadata": {},
    "name": "CreateNewNpcMutation",
    "operationKind": "mutation",
    "text": "mutation CreateNewNpcMutation(\n  $request: CharacterCreationRequest!\n) {\n  createNpc(input: {request: $request}) {\n    character {\n      id\n      clan {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '00060182fb83ba75d16f1428b50a3586';
module.exports = node;
