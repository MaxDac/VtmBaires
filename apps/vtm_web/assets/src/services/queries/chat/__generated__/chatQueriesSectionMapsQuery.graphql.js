/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatQueriesSectionMapsQueryVariables = {|
  parentId: string
|};
export type ChatQueriesSectionMapsQueryResponse = {|
  +sectionMaps: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
    +isChat: ?boolean,
  |}>
|};
export type ChatQueriesSectionMapsQuery = {|
  variables: ChatQueriesSectionMapsQueryVariables,
  response: ChatQueriesSectionMapsQueryResponse,
|};


/*
query ChatQueriesSectionMapsQuery(
  $parentId: ID!
) {
  sectionMaps(parentId: $parentId) {
    id
    name
    description
    isChat
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "parentId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "parentId",
        "variableName": "parentId"
      }
    ],
    "concreteType": "ChatLocation",
    "kind": "LinkedField",
    "name": "sectionMaps",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isChat",
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
    "name": "ChatQueriesSectionMapsQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatQueriesSectionMapsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3252674a8caa115cb578071d24ebe2bb",
    "id": null,
    "metadata": {},
    "name": "ChatQueriesSectionMapsQuery",
    "operationKind": "query",
    "text": "query ChatQueriesSectionMapsQuery(\n  $parentId: ID!\n) {\n  sectionMaps(parentId: $parentId) {\n    id\n    name\n    description\n    isChat\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '3fa6aa6fa148070cad21d5910125ae91';
module.exports = node;
