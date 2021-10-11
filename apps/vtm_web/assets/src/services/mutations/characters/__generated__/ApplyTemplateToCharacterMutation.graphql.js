/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ApplyTemplateToCharacterMutationVariables = {|
  characterId: string,
  templateId: string,
|};
export type ApplyTemplateToCharacterMutationResponse = {|
  +applyTemplateToCharacter: ?{|
    +result: ?boolean
  |}
|};
export type ApplyTemplateToCharacterMutation = {|
  variables: ApplyTemplateToCharacterMutationVariables,
  response: ApplyTemplateToCharacterMutationResponse,
|};


/*
mutation ApplyTemplateToCharacterMutation(
  $characterId: ID!
  $templateId: ID!
) {
  applyTemplateToCharacter(input: {characterId: $characterId, templateId: $templateId}) {
    result
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
    "name": "templateId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "characterId",
            "variableName": "characterId"
          },
          {
            "kind": "Variable",
            "name": "templateId",
            "variableName": "templateId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ApplyTemplateToCharacterPayload",
    "kind": "LinkedField",
    "name": "applyTemplateToCharacter",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "result",
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
    "name": "ApplyTemplateToCharacterMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApplyTemplateToCharacterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b5cd03b067cf8db762571955d3586400",
    "id": null,
    "metadata": {},
    "name": "ApplyTemplateToCharacterMutation",
    "operationKind": "mutation",
    "text": "mutation ApplyTemplateToCharacterMutation(\n  $characterId: ID!\n  $templateId: ID!\n) {\n  applyTemplateToCharacter(input: {characterId: $characterId, templateId: $templateId}) {\n    result\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'fdb17ca909adf1bb004179e02a4a828b';
module.exports = node;
