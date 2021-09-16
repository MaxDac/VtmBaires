/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SectionMapsQueryVariables = {|
  parentId: string
|};
export type SectionMapsQueryResponse = {|
  +sectionMaps: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +description: ?string,
    +isChat: ?boolean,
  |}>
|};
export type SectionMapsQuery = {|
  variables: SectionMapsQueryVariables,
  response: SectionMapsQueryResponse,
|};


/*
query SectionMapsQuery(
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
    "name": "SectionMapsQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SectionMapsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "69bcc987e8fa9133847f7c2ec85b1abb",
    "id": null,
    "metadata": {},
    "name": "SectionMapsQuery",
    "operationKind": "query",
    "text": "query SectionMapsQuery(\n  $parentId: ID!\n) {\n  sectionMaps(parentId: $parentId) {\n    id\n    name\n    description\n    isChat\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '779753aaa2131fd53481b86144057f66';
module.exports = node;
