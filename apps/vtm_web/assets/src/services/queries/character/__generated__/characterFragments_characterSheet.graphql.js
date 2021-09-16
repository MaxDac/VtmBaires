/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CharacterFragments_characterSheet$ref: FragmentReference;
declare export opaque type CharacterFragments_characterSheet$fragmentType: CharacterFragments_characterSheet$ref;
export type CharacterFragments_characterSheet = {|
  +id: string,
  +biography: ?string,
  +description: ?string,
  +$refType: CharacterFragments_characterSheet$ref,
|};
export type CharacterFragments_characterSheet$data = CharacterFragments_characterSheet;
export type CharacterFragments_characterSheet$key = {
  +$data?: CharacterFragments_characterSheet$data,
  +$fragmentRefs: CharacterFragments_characterSheet$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterFragments_characterSheet",
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
  "type": "Character",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'b2e9a29b8d8baa699f8f79e782b25056';
module.exports = node;
