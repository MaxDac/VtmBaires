/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CharacterFragments_characterState$ref: FragmentReference;
declare export opaque type CharacterFragments_characterState$fragmentType: CharacterFragments_characterState$ref;
export type CharacterFragments_characterState = {|
  +id: string,
  +stage: ?number,
  +approved: ?boolean,
  +isComplete: ?boolean,
  +isNpc: ?boolean,
  +experience: ?number,
  +advantages: ?string,
  +notes: ?string,
  +predatorType: ?{|
    +id: string,
    +name: ?string,
  |},
  +$refType: CharacterFragments_characterState$ref,
|};
export type CharacterFragments_characterState$data = CharacterFragments_characterState;
export type CharacterFragments_characterState$key = {
  +$data?: CharacterFragments_characterState$data,
  +$fragmentRefs: CharacterFragments_characterState$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterFragments_characterState",
  "selections": [
    (v0/*: any*/),
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
      "name": "experience",
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
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '8303abe93689751d510135ff9da24e10';
module.exports = node;
