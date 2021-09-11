/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CharacterAttributeRequest = {|
  attributeId: string,
  characterId: string,
  value: number,
|};
export type appendAttributesMutationVariables = {|
  request: $ReadOnlyArray<?CharacterAttributeRequest>,
  newStage: number,
|};
export type appendAttributesMutationResponse = {|
  +appendCharacterAttributes: ?{|
    +info: ?{|
      +id: ?string,
      +name: ?string,
    |}
  |}
|};
export type appendAttributesMutation = {|
  variables: appendAttributesMutationVariables,
  response: appendAttributesMutationResponse,
|};


/*
mutation appendAttributesMutation(
  $request: [CharacterAttributeRequest]!
  $newStage: Int!
) {
  appendCharacterAttributes(request: $request, newStage: $newStage) {
    info {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "newStage"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "request"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "newStage",
        "variableName": "newStage"
      },
      {
        "kind": "Variable",
        "name": "request",
        "variableName": "request"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "appendCharacterAttributes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CharacterInfo",
        "kind": "LinkedField",
        "name": "info",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "appendAttributesMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "appendAttributesMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "c9fcf828738341cd76988daffd4258eb",
    "id": null,
    "metadata": {},
    "name": "appendAttributesMutation",
    "operationKind": "mutation",
    "text": "mutation appendAttributesMutation(\n  $request: [CharacterAttributeRequest]!\n  $newStage: Int!\n) {\n  appendCharacterAttributes(request: $request, newStage: $newStage) {\n    info {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'f2c156fe2061243f7ea6ab0d0d7e2b46';
module.exports = node;
