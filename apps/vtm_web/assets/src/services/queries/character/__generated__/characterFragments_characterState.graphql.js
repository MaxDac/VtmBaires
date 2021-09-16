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
  +advantages: ?string,
  +notes: ?string,
  +$refType: CharacterFragments_characterState$ref,
|};
export type CharacterFragments_characterState$data = CharacterFragments_characterState;
export type CharacterFragments_characterState$key = {
  +$data?: CharacterFragments_characterState$data,
  +$fragmentRefs: CharacterFragments_characterState$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterFragments_characterState",
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
    }
  ],
  "type": "Character",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'e1f8e1654ac9921446cc70ebc9100848';
module.exports = node;
