/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AttributesQueryVariables = {||};
export type AttributesQueryResponse = {|
  +attributes: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +description: ?string,
    +attributeType: ?{|
      +id: string,
      +name: ?string,
      +section: ?string,
    |},
  |}>
|};
export type AttributesQuery = {|
  variables: AttributesQueryVariables,
  response: AttributesQueryResponse,
|};


/*
query AttributesQuery {
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
    "name": "AttributesQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AttributesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "ab46d33b824ccc4e4c43ea10a43f3542",
    "id": null,
    "metadata": {},
    "name": "AttributesQuery",
    "operationKind": "query",
    "text": "query AttributesQuery {\n  attributes {\n    id\n    name\n    description\n    attributeType {\n      id\n      name\n      section\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'b01b5b6e4f0d1975fbf34049fe288d53';
module.exports = node;
