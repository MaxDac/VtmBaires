/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
type CharacterFragments_characterAvatar$ref = any;
export type GetCharacterCompleteQueryVariables = {|
  id: string
|};
export type GetCharacterCompleteQueryResponse = {|
  +getCharacter: ?{|
    +id: string,
    +name: ?string,
    +chatAvatar: ?string,
    +clan: ?{|
      +id: string,
      +name: ?string,
    |},
    +biography: ?string,
    +description: ?string,
    +humanity: ?number,
    +experience: ?number,
    +generation: ?number,
    +hunger: ?number,
    +health: ?number,
    +damage: ?number,
    +aggravatedDamage: ?number,
    +willpower: ?number,
    +willpowerDamage: ?number,
    +stage: ?number,
    +approved: ?boolean,
    +isComplete: ?boolean,
    +isNpc: ?boolean,
    +advantages: ?string,
    +notes: ?string,
    +predatorType: ?{|
      +id: string,
      +name: ?string,
    |},
    +$fragmentRefs: CharacterFragments_characterAvatar$ref,
  |}
|};
export type GetCharacterCompleteQuery = {|
  variables: GetCharacterCompleteQueryVariables,
  response: GetCharacterCompleteQueryResponse,
|};


/*
query GetCharacterCompleteQuery(
  $id: ID!
) {
  getCharacter(id: $id) {
    id
    name
    chatAvatar
    clan {
      id
      name
    }
    biography
    description
    humanity
    experience
    generation
    hunger
    health
    damage
    aggravatedDamage
    willpower
    willpowerDamage
    stage
    approved
    isComplete
    isNpc
    advantages
    notes
    predatorType {
      id
      name
    }
    ...CharacterFragments_characterAvatar
  }
}

fragment CharacterFragments_characterAvatar on Character {
  avatar
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "chatAvatar",
  "storageKey": null
},
v5 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Clan",
  "kind": "LinkedField",
  "name": "clan",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "biography",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "humanity",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "experience",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "generation",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hunger",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "health",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "damage",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "aggravatedDamage",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "willpower",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "willpowerDamage",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stage",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approved",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isComplete",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isNpc",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "advantages",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notes",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "PredatorType",
  "kind": "LinkedField",
  "name": "predatorType",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetCharacterCompleteQuery",
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
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          (v24/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CharacterFragments_characterAvatar"
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
    "name": "GetCharacterCompleteQuery",
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
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          (v24/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6e248cb901915c47f5de14534b6f95ab",
    "id": null,
    "metadata": {},
    "name": "GetCharacterCompleteQuery",
    "operationKind": "query",
    "text": "query GetCharacterCompleteQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    id\n    name\n    chatAvatar\n    clan {\n      id\n      name\n    }\n    biography\n    description\n    humanity\n    experience\n    generation\n    hunger\n    health\n    damage\n    aggravatedDamage\n    willpower\n    willpowerDamage\n    stage\n    approved\n    isComplete\n    isNpc\n    advantages\n    notes\n    predatorType {\n      id\n      name\n    }\n    ...CharacterFragments_characterAvatar\n  }\n}\n\nfragment CharacterFragments_characterAvatar on Character {\n  avatar\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'ddb4a88192c0fb0078ad107c462a0c2d';
module.exports = node;
