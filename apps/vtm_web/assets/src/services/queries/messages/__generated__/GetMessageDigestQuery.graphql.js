/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetMessageDigestQueryVariables = {||};
export type GetMessageDigestQueryResponse = {|
  +messagesDigest: ?{|
    +totalMessages: ?number,
    +unreadMessages: ?number,
  |}
|};
export type GetMessageDigestQuery = {|
  variables: GetMessageDigestQueryVariables,
  response: GetMessageDigestQueryResponse,
|};


/*
query GetMessageDigestQuery {
  messagesDigest {
    totalMessages
    unreadMessages
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "MessageDigest",
    "kind": "LinkedField",
    "name": "messagesDigest",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalMessages",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "unreadMessages",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetMessageDigestQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetMessageDigestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "76466f23b5d8438d4d9f1fa51a977ad0",
    "id": null,
    "metadata": {},
    "name": "GetMessageDigestQuery",
    "operationKind": "query",
    "text": "query GetMessageDigestQuery {\n  messagesDigest {\n    totalMessages\n    unreadMessages\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e0dce934e6f9721fd7e05dc2f0e70d2f';
module.exports = node;
