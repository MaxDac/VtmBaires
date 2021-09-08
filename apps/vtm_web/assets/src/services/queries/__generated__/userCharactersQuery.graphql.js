/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type userCharactersQueryVariables = {||};
export type userCharactersQueryResponse = {|
  +me: ?{|
    +userCharacters: ?$ReadOnlyArray<?{|
      +id: ?string,
      +name: ?string,
      +avatar: ?string,
    |}>
  |}
|};
export type userCharactersQuery = {|
  variables: userCharactersQueryVariables,
  response: userCharactersQueryResponse,
|};
*/


/*
query userCharactersQuery {
  me {
    __typename
    userCharacters {
      id
      name
      avatar
    }
    id
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
  "concreteType": "CharacterInfo",
  "kind": "LinkedField",
  "name": "userCharacters",
  "plural": true,
  "selections": [
    (v0/*: any*/),
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
      "name": "avatar",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "userCharactersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
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
    "name": "userCharactersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "876b12479358b6dafdc81fa7fc5819d1",
    "id": null,
    "metadata": {},
    "name": "userCharactersQuery",
    "operationKind": "query",
    "text": "query userCharactersQuery {\n  me {\n    __typename\n    userCharacters {\n      id\n      name\n      avatar\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '89b32a42e88b7061e8bbf391d1474681';

module.exports = node;
