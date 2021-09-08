/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type characterFragments_characterState$ref: FragmentReference;
declare export opaque type characterFragments_characterState$fragmentType: characterFragments_characterState$ref;
export type characterFragments_characterState = {|
  +stage: ?number,
  +approved: ?boolean,
  +isComplete: ?boolean,
  +isNpc: ?boolean,
  +$refType: characterFragments_characterState$ref,
|};
export type characterFragments_characterState$data = characterFragments_characterState;
export type characterFragments_characterState$key = {
  +$data?: characterFragments_characterState$data,
  +$fragmentRefs: characterFragments_characterState$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "characterFragments_characterState",
  "selections": [
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
    }
  ],
  "type": "Character",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'a5a51828d6fdb0c0c271dffc94770088';

module.exports = node;
