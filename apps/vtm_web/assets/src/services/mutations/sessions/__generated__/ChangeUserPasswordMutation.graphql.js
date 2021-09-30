/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChangeUserPasswordMutationVariables = {|
  oldPassword: string,
  newPassword: string,
  repeatPassword: string,
|};
export type ChangeUserPasswordMutationResponse = {|
  +updateUserPassword: ?boolean
|};
export type ChangeUserPasswordMutation = {|
  variables: ChangeUserPasswordMutationVariables,
  response: ChangeUserPasswordMutationResponse,
|};


/*
mutation ChangeUserPasswordMutation(
  $oldPassword: String!
  $newPassword: String!
  $repeatPassword: String!
) {
  updateUserPassword(oldPassword: $oldPassword, newPassword: $newPassword, repeatPassword: $repeatPassword)
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "newPassword"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "oldPassword"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repeatPassword"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "newPassword",
        "variableName": "newPassword"
      },
      {
        "kind": "Variable",
        "name": "oldPassword",
        "variableName": "oldPassword"
      },
      {
        "kind": "Variable",
        "name": "repeatPassword",
        "variableName": "repeatPassword"
      }
    ],
    "kind": "ScalarField",
    "name": "updateUserPassword",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeUserPasswordMutation",
    "selections": (v3/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChangeUserPasswordMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "aedc7ae930fba190b1ccdd86031cf2a6",
    "id": null,
    "metadata": {},
    "name": "ChangeUserPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeUserPasswordMutation(\n  $oldPassword: String!\n  $newPassword: String!\n  $repeatPassword: String!\n) {\n  updateUserPassword(oldPassword: $oldPassword, newPassword: $newPassword, repeatPassword: $repeatPassword)\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '78a556916005cf62aea8383b638d29fb';
module.exports = node;
