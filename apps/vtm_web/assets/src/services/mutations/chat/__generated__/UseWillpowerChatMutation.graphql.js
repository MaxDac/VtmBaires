/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UseWillpowerInput = {|
  characterId: string,
  chatMapId: string,
|};
export type UseWillpowerChatMutationVariables = {|
  input: UseWillpowerInput
|};
export type UseWillpowerChatMutationResponse = {|
  +useWillpower: ?{|
    +result: ?{|
      +id: string,
      +text: ?string,
      +character: ?{|
        +id: string
      |},
      +chatMap: ?{|
        +id: string
      |},
    |}
  |}
|};
export type UseWillpowerChatMutation = {|
  variables: UseWillpowerChatMutationVariables,
  response: UseWillpowerChatMutationResponse,
|};


/*
mutation UseWillpowerChatMutation(
  $input: UseWillpowerInput!
) {
  useWillpower(input: $input) {
    result {
      id
      text
      character {
        id
      }
      chatMap {
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UseWillpowerPayload",
    "kind": "LinkedField",
    "name": "useWillpower",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MapChatEntry",
        "kind": "LinkedField",
        "name": "result",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ChatLocation",
            "kind": "LinkedField",
            "name": "chatMap",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UseWillpowerChatMutation",
    "selections": (v3/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UseWillpowerChatMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5328fdcddc40598377aafd6ee10522d7",
    "id": null,
    "metadata": {},
    "name": "UseWillpowerChatMutation",
    "operationKind": "mutation",
    "text": "mutation UseWillpowerChatMutation(\n  $input: UseWillpowerInput!\n) {\n  useWillpower(input: $input) {\n    result {\n      id\n      text\n      character {\n        id\n      }\n      chatMap {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'cee47ddece136b9076aa84bb5ce2cb7f';
module.exports = node;
