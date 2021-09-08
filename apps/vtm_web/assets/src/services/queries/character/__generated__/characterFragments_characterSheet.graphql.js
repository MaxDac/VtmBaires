/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type characterFragments_characterSheet$ref: FragmentReference;
declare export opaque type characterFragments_characterSheet$fragmentType: characterFragments_characterSheet$ref;
export type characterFragments_characterSheet = {|
  +biography: ?string,
  +description: ?string,
  +$refType: characterFragments_characterSheet$ref,
|};
export type characterFragments_characterSheet$data = characterFragments_characterSheet;
export type characterFragments_characterSheet$key = {
  +$data?: characterFragments_characterSheet$data,
  +$fragmentRefs: characterFragments_characterSheet$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "characterFragments_characterSheet",
  "selections": [
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
(node/*: any*/).hash = 'a23a5646a68d1ab08f0250ba18cccdef';

module.exports = node;
