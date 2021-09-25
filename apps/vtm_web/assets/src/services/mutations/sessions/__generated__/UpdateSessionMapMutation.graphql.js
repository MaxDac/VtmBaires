/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UpdateSessionMapMutationVariables = {|
  mapId: string
|};
export type UpdateSessionMapMutationResponse = {|
  +updateSessionMap: ?string
|};
export type UpdateSessionMapMutation = {|
  variables: UpdateSessionMapMutationVariables,
  response: UpdateSessionMapMutationResponse,
|};


/*
mutation UpdateSessionMapMutation(
  $mapId: ID!
) {
  updateSessionMap(mapId: $mapId)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mapId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "mapId",
        "variableName": "mapId"
      }
    ],
    "kind": "ScalarField",
    "name": "updateSessionMap",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateSessionMapMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateSessionMapMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cb33a25f7e40702c0297a7bb96a868a3",
    "id": null,
    "metadata": {},
    "name": "UpdateSessionMapMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateSessionMapMutation(\n  $mapId: ID!\n) {\n  updateSessionMap(mapId: $mapId)\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '026963c663d59b825f0b2975a4e7ae5b';
module.exports = node;
