/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
type CharacterFragments_characterAvatar$ref = any;
type CharacterFragments_characterInfo$ref = any;
type CharacterFragments_characterSheet$ref = any;
type CharacterFragments_characterState$ref = any;
type CharacterFragments_characterStats$ref = any;
export type GetCharacterQueryVariables = {|
  id: string
|};
export type GetCharacterQueryResponse = {|
  +getCharacter: ?{|
    +id: string,
    +$fragmentRefs: CharacterFragments_characterAvatar$ref & CharacterFragments_characterInfo$ref & CharacterFragments_characterSheet$ref & CharacterFragments_characterStats$ref & CharacterFragments_characterState$ref,
  |}
|};
export type GetCharacterQuery = {|
  variables: GetCharacterQueryVariables,
  response: GetCharacterQueryResponse,
|};


/*
query GetCharacterQuery(
  $id: ID!
) {
  getCharacter(id: $id) {
    id
    ...CharacterFragments_characterAvatar
    ...CharacterFragments_characterInfo
    ...CharacterFragments_characterSheet
    ...CharacterFragments_characterStats
    ...CharacterFragments_characterState
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

fragment CharacterFragments_characterState on Character {
  id
  stage
  approved
  isComplete
  isNpc
  experience
  advantages
  notes
  predatorType {
    id
    name
  }
}

fragment CharacterFragments_characterStats on Character {
  id
  humanity
  experience
  generation
  hunger
  health
  damage
  aggravatedDamage
  willpower
  willpowerDamage
  stains
  bloodPotency
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
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetCharacterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "getCharacter",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CharacterFragments_characterStats"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CharacterFragments_characterState"
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
    "name": "GetCharacterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "getCharacter",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          },
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
            "selections": (v4/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "humanity",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "experience",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "generation",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hunger",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "health",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "damage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "aggravatedDamage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "willpower",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "willpowerDamage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stains",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bloodPotency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "approved",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isComplete",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isNpc",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "advantages",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "notes",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PredatorType",
            "kind": "LinkedField",
            "name": "predatorType",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "352142dc9b79ea2a76024336eee567d3",
    "id": null,
    "metadata": {},
    "name": "GetCharacterQuery",
    "operationKind": "query",
    "text": "query GetCharacterQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    id\n    ...CharacterFragments_characterAvatar\n    ...CharacterFragments_characterInfo\n    ...CharacterFragments_characterSheet\n    ...CharacterFragments_characterStats\n    ...CharacterFragments_characterState\n  }\n}\n\nfragment CharacterFragments_characterAvatar on Character {\n  avatar\n}\n\nfragment CharacterFragments_characterInfo on Character {\n  id\n  name\n  chatAvatar\n  clan {\n    id\n    name\n  }\n}\n\nfragment CharacterFragments_characterSheet on Character {\n  id\n  biography\n  description\n}\n\nfragment CharacterFragments_characterState on Character {\n  id\n  stage\n  approved\n  isComplete\n  isNpc\n  experience\n  advantages\n  notes\n  predatorType {\n    id\n    name\n  }\n}\n\nfragment CharacterFragments_characterStats on Character {\n  id\n  humanity\n  experience\n  generation\n  hunger\n  health\n  damage\n  aggravatedDamage\n  willpower\n  willpowerDamage\n  stains\n  bloodPotency\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'ec01a33d95fbda441a8d163b09e6468b';
module.exports = node;
