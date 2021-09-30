/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UserEmailExistsQueryVariables = {|
  email: string
|};
export type UserEmailExistsQueryResponse = {|
  +userEmailExists: ?boolean
|};
export type UserEmailExistsQuery = {|
  variables: UserEmailExistsQueryVariables,
  response: UserEmailExistsQueryResponse,
|};


/*
query UserEmailExistsQuery(
  $email: String!
) {
  userEmailExists(email: $email)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "kind": "ScalarField",
    "name": "userEmailExists",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserEmailExistsQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserEmailExistsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f8e0c9e3de9bff71338c356a89f6968b",
    "id": null,
    "metadata": {},
    "name": "UserEmailExistsQuery",
    "operationKind": "query",
    "text": "query UserEmailExistsQuery(\n  $email: String!\n) {\n  userEmailExists(email: $email)\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '98546eccf9b640e371312749e8600faf';
module.exports = node;
