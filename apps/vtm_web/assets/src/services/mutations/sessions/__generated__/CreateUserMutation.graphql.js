/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CreateUserMutationVariables = {|
  email: string,
  password: string,
  name: string,
|};
export type CreateUserMutationResponse = {|
  +createUser: ?{|
    +id: ?string
  |}
|};
export type CreateUserMutation = {|
  variables: CreateUserMutationVariables,
  response: CreateUserMutationResponse,
|};


/*
mutation CreateUserMutation(
  $email: String!
  $password: String!
  $name: String!
) {
  createUser(email: $email, password: $password, name: $name) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      }
    ],
    "concreteType": "CreationResult",
    "kind": "LinkedField",
    "name": "createUser",
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
    "name": "CreateUserMutation",
    "selections": (v3/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateUserMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "719b01e9f27afff2e6567c3aa9dfce25",
    "id": null,
    "metadata": {},
    "name": "CreateUserMutation",
    "operationKind": "mutation",
    "text": "mutation CreateUserMutation(\n  $email: String!\n  $password: String!\n  $name: String!\n) {\n  createUser(email: $email, password: $password, name: $name) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '3ec93124fa0866289d07c75393e1a4c1';
module.exports = node;
