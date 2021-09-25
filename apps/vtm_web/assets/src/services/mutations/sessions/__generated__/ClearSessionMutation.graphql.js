/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ClearSessionMutationVariables = {||};
export type ClearSessionMutationResponse = {|
  +resetSession: ?boolean
|};
export type ClearSessionMutation = {|
  variables: ClearSessionMutationVariables,
  response: ClearSessionMutationResponse,
|};


/*
mutation ClearSessionMutation {
  resetSession
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "resetSession",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClearSessionMutation",
    "selections": (v0/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ClearSessionMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e09ecaf6b1c0866b664ca3550c2104a3",
    "id": null,
    "metadata": {},
    "name": "ClearSessionMutation",
    "operationKind": "mutation",
    "text": "mutation ClearSessionMutation {\n  resetSession\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'cbbf9f38a0bdc7a9a4c78854f27ecd3c';
module.exports = node;
