/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type characterFragments_characterInfo$ref: FragmentReference;
declare export opaque type characterFragments_characterInfo$fragmentType: characterFragments_characterInfo$ref;
export type characterFragments_characterInfo = {|
  +info: ?{|
    +id: ?string,
    +name: ?string,
    +avatar: ?string,
  |},
  +$refType: characterFragments_characterInfo$ref,
|};
export type characterFragments_characterInfo$data = characterFragments_characterInfo;
export type characterFragments_characterInfo$key = {
  +$data?: characterFragments_characterInfo$data,
  +$fragmentRefs: characterFragments_characterInfo$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "characterFragments_characterInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CharacterInfo",
      "kind": "LinkedField",
      "name": "info",
      "plural": false,
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
    }
  ],
  "type": "Character",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'af496f71652f9879f89e539611e11da0';
module.exports = node;
