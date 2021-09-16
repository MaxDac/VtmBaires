/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CharacterFragments_characterInfo$ref: FragmentReference;
declare export opaque type CharacterFragments_characterInfo$fragmentType: CharacterFragments_characterInfo$ref;
export type CharacterFragments_characterInfo = {|
  +id: string,
  +name: ?string,
  +chatAvatar: ?string,
  +clan: ?{|
    +id: string,
    +name: ?string,
  |},
  +$refType: CharacterFragments_characterInfo$ref,
|};
export type CharacterFragments_characterInfo$data = CharacterFragments_characterInfo;
export type CharacterFragments_characterInfo$key = {
  +$data?: CharacterFragments_characterInfo$data,
  +$fragmentRefs: CharacterFragments_characterInfo$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterFragments_characterInfo",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "chatAvatar",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Clan",
      "kind": "LinkedField",
      "name": "clan",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'd3210214a00fccd960cc00c968592f21';
module.exports = node;
