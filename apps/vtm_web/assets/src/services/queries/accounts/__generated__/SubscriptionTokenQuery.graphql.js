/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SubscriptionTokenQueryVariables = {||};
export type SubscriptionTokenQueryResponse = {|
  +subscriptionToken: ?string
|};
export type SubscriptionTokenQuery = {|
  variables: SubscriptionTokenQueryVariables,
  response: SubscriptionTokenQueryResponse,
|};


/*
query SubscriptionTokenQuery {
  subscriptionToken
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "subscriptionToken",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SubscriptionTokenQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SubscriptionTokenQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "df72d223a6c73fb9c149956179bcc226",
    "id": null,
    "metadata": {},
    "name": "SubscriptionTokenQuery",
    "operationKind": "query",
    "text": "query SubscriptionTokenQuery {\n  subscriptionToken\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '269423d1255376ad48e0ad3cfb81b5ee';
module.exports = node;
