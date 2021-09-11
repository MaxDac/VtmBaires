/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type attributesQueryVariables = {||};
export type attributesQueryResponse = {|
  +attributes: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +description: ?string,
    +attributeType: ?{|
      +id: ?string,
      +name: ?string,
      +section: ?string,
    |},
  |}>
|};
export type attributesQuery = {|
  variables: attributesQueryVariables,
  response: attributesQueryResponse,
|};


/*
query attributesQuery {
  attributes {
    id
    name
    description
    attributeType {
      id
      name
      section
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Attribute",
    "kind": "LinkedField",
    "name": "attributes",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
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
        "concreteType": "AttributeType",
        "kind": "LinkedField",
        "name": "attributeType",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "section",
            "storageKey": null
          }
        ],
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
    "name": "attributesQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "attributesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "01f708ed4e02eb372d3c93c0ff6360d5",
    "id": null,
    "metadata": {},
    "name": "attributesQuery",
    "operationKind": "query",
    "text": "query attributesQuery {\n  attributes {\n    id\n    name\n    description\n    attributeType {\n      id\n      name\n      section\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '498415be44f48d24f826141ca0fa44d8';
module.exports = node;
