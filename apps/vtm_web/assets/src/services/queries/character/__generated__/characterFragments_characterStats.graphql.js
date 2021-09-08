/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type characterFragments_characterStats$ref: FragmentReference;
declare export opaque type characterFragments_characterStats$fragmentType: characterFragments_characterStats$ref;
export type characterFragments_characterStats = {|
  +clan: ?{|
    +id: ?string,
    +name: ?string,
  |},
  +humanity: ?number,
  +$refType: characterFragments_characterStats$ref,
|};
export type characterFragments_characterStats$data = characterFragments_characterStats;
export type characterFragments_characterStats$key = {
  +$data?: characterFragments_characterStats$data,
  +$fragmentRefs: characterFragments_characterStats$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "characterFragments_characterStats",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Clan",
      "kind": "LinkedField",
      "name": "clan",
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "humanity",
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '0905e799e9a91b8a1b6618ca3509dd3a';

module.exports = node;
