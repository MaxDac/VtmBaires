/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetCharacterStatsQueryVariables = {|
  id: string
|};
export type GetCharacterStatsQueryResponse = {|
  +getCharacterStats: ?{|
    +id: ?string,
    +attributes: ?$ReadOnlyArray<?{|
      +id: string,
      +value: ?number,
      +attribute: ?{|
        +name: ?string,
        +attributeType: ?{|
          +name: ?string,
          +section: ?string,
        |},
      |},
    |}>,
    +disciplines: ?$ReadOnlyArray<?{|
      +id: string,
      +value: ?number,
      +attribute: ?{|
        +name: ?string
      |},
    |}>,
    +advantages: ?$ReadOnlyArray<?{|
      +id: string,
      +value: ?number,
      +attribute: ?{|
        +name: ?string
      |},
    |}>,
    +predatorType: ?{|
      +id: string,
      +name: ?string,
      +description: ?string,
    |},
  |}
|};
export type GetCharacterStatsQuery = {|
  variables: GetCharacterStatsQueryVariables,
  response: GetCharacterStatsQueryResponse,
|};


/*
query GetCharacterStatsQuery(
  $id: ID!
) {
  getCharacterStats(characterId: $id) {
    id
    attributes {
      id
      value
      attribute {
        name
        attributeType {
          name
          section
          id
        }
        id
      }
    }
    disciplines {
      id
      value
      attribute {
        name
        id
      }
    }
    advantages {
      id
      value
      attribute {
        name
        id
      }
    }
    predatorType {
      id
      name
      description
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "characterId",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "section",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Attribute",
    "kind": "LinkedField",
    "name": "attribute",
    "plural": false,
    "selections": [
      (v4/*: any*/)
    ],
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "PredatorType",
  "kind": "LinkedField",
  "name": "predatorType",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Attribute",
    "kind": "LinkedField",
    "name": "attribute",
    "plural": false,
    "selections": [
      (v4/*: any*/),
      (v2/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetCharacterStatsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CharacterStats",
        "kind": "LinkedField",
        "name": "getCharacterStats",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CharacterAttribute",
            "kind": "LinkedField",
            "name": "attributes",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Attribute",
                "kind": "LinkedField",
                "name": "attribute",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AttributeType",
                    "kind": "LinkedField",
                    "name": "attributeType",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CharacterAttribute",
            "kind": "LinkedField",
            "name": "disciplines",
            "plural": true,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CharacterAttribute",
            "kind": "LinkedField",
            "name": "advantages",
            "plural": true,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCharacterStatsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CharacterStats",
        "kind": "LinkedField",
        "name": "getCharacterStats",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CharacterAttribute",
            "kind": "LinkedField",
            "name": "attributes",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Attribute",
                "kind": "LinkedField",
                "name": "attribute",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AttributeType",
                    "kind": "LinkedField",
                    "name": "attributeType",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CharacterAttribute",
            "kind": "LinkedField",
            "name": "disciplines",
            "plural": true,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CharacterAttribute",
            "kind": "LinkedField",
            "name": "advantages",
            "plural": true,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a872fe8baace040727c7ae51097263cc",
    "id": null,
    "metadata": {},
    "name": "GetCharacterStatsQuery",
    "operationKind": "query",
    "text": "query GetCharacterStatsQuery(\n  $id: ID!\n) {\n  getCharacterStats(characterId: $id) {\n    id\n    attributes {\n      id\n      value\n      attribute {\n        name\n        attributeType {\n          name\n          section\n          id\n        }\n        id\n      }\n    }\n    disciplines {\n      id\n      value\n      attribute {\n        name\n        id\n      }\n    }\n    advantages {\n      id\n      value\n      attribute {\n        name\n        id\n      }\n    }\n    predatorType {\n      id\n      name\n      description\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '0edfffcdbf6e52262c12a5392457e3ab';
module.exports = node;
