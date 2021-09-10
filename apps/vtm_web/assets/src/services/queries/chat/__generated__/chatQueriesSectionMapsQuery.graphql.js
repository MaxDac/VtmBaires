/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatQueriesSectionMapsQueryVariables = {|
  parentId: string
|};
export type chatQueriesSectionMapsQueryResponse = {|
  +sectionMaps: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
    +isChat: ?boolean,
  |}>
|};
export type chatQueriesSectionMapsQuery = {|
  variables: chatQueriesSectionMapsQueryVariables,
  response: chatQueriesSectionMapsQueryResponse,
|};
*/


/*
query chatQueriesSectionMapsQuery(
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

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "chatQueriesSectionMapsQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatQueriesSectionMapsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3fc0903605c740382136543f517c0ae1",
    "id": null,
    "metadata": {},
    "name": "chatQueriesSectionMapsQuery",
    "operationKind": "query",
    "text": "query chatQueriesSectionMapsQuery(\n  $parentId: ID!\n) {\n  sectionMaps(parentId: $parentId) {\n    id\n    name\n    description\n    isChat\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5d6011d5e20d915fa7c8d00b0ea2103a';

module.exports = node;
