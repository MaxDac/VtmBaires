/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type HuntMutationVariables = {|
  characterId: string
|};
export type HuntMutationResponse = {|
  +hunt: ?{|
    +result: ?string
  |}
|};
export type HuntMutation = {|
  variables: HuntMutationVariables,
  response: HuntMutationResponse,
|};


/*
mutation HuntMutation(
  $characterId: ID!
) {
  hunt(input: {characterId: $characterId}) {
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
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "HuntPayload",
    "kind": "LinkedField",
    "name": "hunt",
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
    "name": "HuntMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HuntMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "818fec770f5c60d2d38ae0dcde5efc21",
    "id": null,
    "metadata": {},
    "name": "HuntMutation",
    "operationKind": "mutation",
    "text": "mutation HuntMutation(\n  $characterId: ID!\n) {\n  hunt(input: {characterId: $characterId}) {\n    result\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5a31e81a748a4d787f4584f532ee6265';
module.exports = node;
