/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AllUnapprovedCharactersQueryVariables = {||};
export type AllUnapprovedCharactersQueryResponse = {|
  +unapprovedCharactersList: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
  |}>
|};
export type AllUnapprovedCharactersQuery = {|
  variables: AllUnapprovedCharactersQueryVariables,
  response: AllUnapprovedCharactersQueryResponse,
|};


/*
query AllUnapprovedCharactersQuery {
  unapprovedCharactersList {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "unapprovedCharactersList",
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
        "name": "name",
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
    "name": "AllUnapprovedCharactersQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AllUnapprovedCharactersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "58bec44a6715bc8012a8be9005b715ca",
    "id": null,
    "metadata": {},
    "name": "AllUnapprovedCharactersQuery",
    "operationKind": "query",
    "text": "query AllUnapprovedCharactersQuery {\n  unapprovedCharactersList {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '83e3e8b303891772f3e51ec1eb8fcfab';
module.exports = node;
