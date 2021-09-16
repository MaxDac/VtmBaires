/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AttributesSlimQueryVariables = {||};
export type AttributesSlimQueryResponse = {|
  +attributes: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +attributeType: ?{|
      +name: ?string,
      +section: ?string,
    |},
  |}>
|};
export type AttributesSlimQuery = {|
  variables: AttributesSlimQueryVariables,
  response: AttributesSlimQueryResponse,
|};


/*
query AttributesSlimQuery {
  attributes {
    id
    name
    attributeType {
      name
      section
      id
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "section",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AttributesSlimQuery",
    "selections": [
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
            "concreteType": "AttributeType",
            "kind": "LinkedField",
            "name": "attributeType",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AttributesSlimQuery",
    "selections": [
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
            "concreteType": "AttributeType",
            "kind": "LinkedField",
            "name": "attributeType",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ff15369ba3e8f55ec13e96b614d121e9",
    "id": null,
    "metadata": {},
    "name": "AttributesSlimQuery",
    "operationKind": "query",
    "text": "query AttributesSlimQuery {\n  attributes {\n    id\n    name\n    attributeType {\n      name\n      section\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '145fa031dddca00b697e3fdc739f8609';
module.exports = node;
