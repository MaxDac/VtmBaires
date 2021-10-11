/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChangeCharacterNotesInput = {|
  advantages?: ?string,
  characterId?: ?string,
  notes?: ?string,
|};
export type ChangeCharacterNotesMutationVariables = {|
  input: ChangeCharacterNotesInput
|};
export type ChangeCharacterNotesMutationResponse = {|
  +changeCharacterNotes: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type ChangeCharacterNotesMutation = {|
  variables: ChangeCharacterNotesMutationVariables,
  response: ChangeCharacterNotesMutationResponse,
|};


/*
mutation ChangeCharacterNotesMutation(
  $input: ChangeCharacterNotesInput!
) {
  changeCharacterNotes(input: $input) {
    result {
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
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ChangeCharacterNotesPayload",
    "kind": "LinkedField",
    "name": "changeCharacterNotes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "result",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "ChangeCharacterNotesMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCharacterNotesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "49a64c2b856a831f44368364bae20fd2",
    "id": null,
    "metadata": {},
    "name": "ChangeCharacterNotesMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeCharacterNotesMutation(\n  $input: ChangeCharacterNotesInput!\n) {\n  changeCharacterNotes(input: $input) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '48a53691f0bfe6bd7e42220f1813a770';
module.exports = node;
