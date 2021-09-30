/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UserNameExistsQueryVariables = {|
  name: string
|};
export type UserNameExistsQueryResponse = {|
  +userNameExists: ?boolean
|};
export type UserNameExistsQuery = {|
  variables: UserNameExistsQueryVariables,
  response: UserNameExistsQueryResponse,
|};


/*
query UserNameExistsQuery(
  $name: String!
) {
  userNameExists(name: $name)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "kind": "ScalarField",
    "name": "userNameExists",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserNameExistsQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserNameExistsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "816ceb80082e0739eccd2e9b87e8d116",
    "id": null,
    "metadata": {},
    "name": "UserNameExistsQuery",
    "operationKind": "query",
    "text": "query UserNameExistsQuery(\n  $name: String!\n) {\n  userNameExists(name: $name)\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '7bcedfc39e215c901d9c8f13799912ba';
module.exports = node;
