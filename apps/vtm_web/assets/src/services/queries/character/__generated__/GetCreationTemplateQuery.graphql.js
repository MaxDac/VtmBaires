/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetCreationTemplateQueryVariables = {||};
export type GetCreationTemplateQueryResponse = {|
  +getCreationTemplates: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +description: ?string,
  |}>
|};
export type GetCreationTemplateQuery = {|
  variables: GetCreationTemplateQueryVariables,
  response: GetCreationTemplateQueryResponse,
|};


/*
query GetCreationTemplateQuery {
  getCreationTemplates {
    id
    name
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CreationTemplate",
    "kind": "LinkedField",
    "name": "getCreationTemplates",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetCreationTemplateQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetCreationTemplateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "dee09e6499a0c95dbfba50c22239d4ec",
    "id": null,
    "metadata": {},
    "name": "GetCreationTemplateQuery",
    "operationKind": "query",
    "text": "query GetCreationTemplateQuery {\n  getCreationTemplates {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '0c52215bd2c35c406461540bcab40a8d';
module.exports = node;
