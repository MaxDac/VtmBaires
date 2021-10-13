/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RouseCheckInput = {|
  characterId: string,
  chatMapId: string,
|};
export type RouseCheckMutationVariables = {|
  input: RouseCheckInput
|};
export type RouseCheckMutationResponse = {|
  +rouseCheck: ?{|
    +result: ?{|
      +id: string,
      +character: ?{|
        +id: string
      |},
      +text: ?string,
    |}
  |}
|};
export type RouseCheckMutation = {|
  variables: RouseCheckMutationVariables,
  response: RouseCheckMutationResponse,
|};


/*
mutation RouseCheckMutation(
  $input: RouseCheckInput!
) {
  rouseCheck(input: $input) {
    result {
      id
      character {
        id
      }
      text
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RouseCheckPayload",
    "kind": "LinkedField",
    "name": "rouseCheck",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MapChatEntry",
        "kind": "LinkedField",
        "name": "result",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RouseCheckMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RouseCheckMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9c02dec9dfde3dcd2953c34a7e9599bf",
    "id": null,
    "metadata": {},
    "name": "RouseCheckMutation",
    "operationKind": "mutation",
    "text": "mutation RouseCheckMutation(\n  $input: RouseCheckInput!\n) {\n  rouseCheck(input: $input) {\n    result {\n      id\n      character {\n        id\n      }\n      text\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6f13f5ab1f95fd0b413994124fc4891d';
module.exports = node;
