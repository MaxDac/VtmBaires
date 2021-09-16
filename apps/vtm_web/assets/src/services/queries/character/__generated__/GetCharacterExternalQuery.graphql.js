/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
type CharacterFragments_characterAvatar$ref = any;
type CharacterFragments_characterInfo$ref = any;
type CharacterFragments_characterSheet$ref = any;
export type GetCharacterExternalQueryVariables = {|
  id: string
|};
export type GetCharacterExternalQueryResponse = {|
  +getCharacter: ?{|
    +$fragmentRefs: CharacterFragments_characterAvatar$ref & CharacterFragments_characterInfo$ref & CharacterFragments_characterSheet$ref
  |}
|};
export type GetCharacterExternalQuery = {|
  variables: GetCharacterExternalQueryVariables,
  response: GetCharacterExternalQueryResponse,
|};


/*
query GetCharacterExternalQuery(
  $id: ID!
) {
  getCharacter(id: $id) {
    ...CharacterFragments_characterAvatar
    ...CharacterFragments_characterInfo
    ...CharacterFragments_characterSheet
    id
  }
}

fragment CharacterFragments_characterAvatar on Character {
  avatar
}

fragment CharacterFragments_characterInfo on Character {
  id
  name
  chatAvatar
  clan {
    id
    name
  }
}

fragment CharacterFragments_characterSheet on Character {
  id
  biography
  description
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
    "name": "id",
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetCharacterExternalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "getCharacter",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CharacterFragments_characterAvatar"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CharacterFragments_characterInfo"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CharacterFragments_characterSheet"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCharacterExternalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "getCharacter",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "chatAvatar",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Clan",
            "kind": "LinkedField",
            "name": "clan",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "biography",
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
    ]
  },
  "params": {
    "cacheID": "7d2302bbea04d19ee8661fd5135679ce",
    "id": null,
    "metadata": {},
    "name": "GetCharacterExternalQuery",
    "operationKind": "query",
    "text": "query GetCharacterExternalQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    ...CharacterFragments_characterAvatar\n    ...CharacterFragments_characterInfo\n    ...CharacterFragments_characterSheet\n    id\n  }\n}\n\nfragment CharacterFragments_characterAvatar on Character {\n  avatar\n}\n\nfragment CharacterFragments_characterInfo on Character {\n  id\n  name\n  chatAvatar\n  clan {\n    id\n    name\n  }\n}\n\nfragment CharacterFragments_characterSheet on Character {\n  id\n  biography\n  description\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '8916c9921aaf99be07941046e6088dfa';
module.exports = node;
