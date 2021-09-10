/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatQueriesChatEntriesQueryVariables = {|
  mapId: string
|};
export type chatQueriesChatEntriesQueryResponse = {|
  +mapChatEntries: ?$ReadOnlyArray<?{|
    +id: ?string,
    +chatMapId: ?string,
    +characterId: ?string,
    +characterName: ?string,
    +result: ?string,
    +text: ?string,
  |}>
|};
export type chatQueriesChatEntriesQuery = {|
  variables: chatQueriesChatEntriesQueryVariables,
  response: chatQueriesChatEntriesQueryResponse,
|};
*/


/*
query chatQueriesChatEntriesQuery(
  $mapId: ID!
) {
  mapChatEntries(mapId: $mapId) {
    id
    chatMapId
    characterId
    characterName
    result
    text
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mapId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "mapId",
        "variableName": "mapId"
      }
    ],
    "concreteType": "MapChatEntry",
    "kind": "LinkedField",
    "name": "mapChatEntries",
    "plural": true,
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
        "name": "chatMapId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "characterId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "characterName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "result",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
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
    "name": "chatQueriesChatEntriesQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatQueriesChatEntriesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e3bd927dc1f2dffa87aa011bf0fdb7c4",
    "id": null,
    "metadata": {},
    "name": "chatQueriesChatEntriesQuery",
    "operationKind": "query",
    "text": "query chatQueriesChatEntriesQuery(\n  $mapId: ID!\n) {\n  mapChatEntries(mapId: $mapId) {\n    id\n    chatMapId\n    characterId\n    characterName\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ba074a3bc5a72a63f24c5affbc8baaff';

module.exports = node;
