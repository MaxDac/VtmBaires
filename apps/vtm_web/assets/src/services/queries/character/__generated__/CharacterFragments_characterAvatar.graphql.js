/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CharacterFragments_characterAvatar$ref: FragmentReference;
declare export opaque type CharacterFragments_characterAvatar$fragmentType: CharacterFragments_characterAvatar$ref;
export type CharacterFragments_characterAvatar = {|
  +avatar: ?string,
  +$refType: CharacterFragments_characterAvatar$ref,
|};
export type CharacterFragments_characterAvatar$data = CharacterFragments_characterAvatar;
export type CharacterFragments_characterAvatar$key = {
  +$data?: CharacterFragments_characterAvatar$data,
  +$fragmentRefs: CharacterFragments_characterAvatar$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterFragments_characterAvatar",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '3519eb559ad0ecd5607d7f421881cf39';
module.exports = node;
