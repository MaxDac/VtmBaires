/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CharacterFragments_characterStats$ref: FragmentReference;
declare export opaque type CharacterFragments_characterStats$fragmentType: CharacterFragments_characterStats$ref;
export type CharacterFragments_characterStats = {|
  +id: string,
  +humanity: ?number,
  +experience: ?number,
  +generation: ?number,
  +hunger: ?number,
  +health: ?number,
  +damage: ?number,
  +aggravatedDamage: ?number,
  +willpower: ?number,
  +willpowerDamage: ?number,
  +$refType: CharacterFragments_characterStats$ref,
|};
export type CharacterFragments_characterStats$data = CharacterFragments_characterStats;
export type CharacterFragments_characterStats$key = {
  +$data?: CharacterFragments_characterStats$data,
  +$fragmentRefs: CharacterFragments_characterStats$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterFragments_characterStats",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
    }
  ],
  "type": "Character",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '8ceb361cb26ac467b833f50f59cc0eb0';
module.exports = node;
