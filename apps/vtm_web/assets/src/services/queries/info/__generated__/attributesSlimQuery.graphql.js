/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type attributesSlimQueryVariables = {||};
export type attributesSlimQueryResponse = {|
  +attributes: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +attributeType: ?{|
      +name: ?string,
      +section: ?string,
    |},
  |}>
|};
export type attributesSlimQuery = {|
  variables: attributesSlimQueryVariables,
  response: attributesSlimQueryResponse,
|};
*/


/*
query attributesSlimQuery {
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

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "attributesSlimQuery",
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
    "name": "attributesSlimQuery",
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
    "cacheID": "8719290af8b17694fdc9164ab881b713",
    "id": null,
    "metadata": {},
    "name": "attributesSlimQuery",
    "operationKind": "query",
    "text": "query attributesSlimQuery {\n  attributes {\n    id\n    name\n    attributeType {\n      name\n      section\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ca5bcbd47b0c38ee30fe212f21cc805c';

module.exports = node;
