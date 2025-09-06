/**
 * @generated SignedSource<<e5a1df5a19b5a0270249a41258e148f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useTaskMutationsDeleteMutation$variables = {
  id: number;
};
export type useTaskMutationsDeleteMutation$data = {
  readonly deleteTask: {
    readonly errorMessage: string | null | undefined;
    readonly success: boolean;
    readonly task: {
      readonly id: number;
      readonly title: string;
    } | null | undefined;
  };
};
export type useTaskMutationsDeleteMutation = {
  response: useTaskMutationsDeleteMutation$data;
  variables: useTaskMutationsDeleteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "TaskPayload",
    "kind": "LinkedField",
    "name": "deleteTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Task",
        "kind": "LinkedField",
        "name": "task",
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
            "name": "title",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "errorMessage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
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
    "name": "useTaskMutationsDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useTaskMutationsDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a4ad8cd915972b5cb4a460bcddea25e1",
    "id": null,
    "metadata": {},
    "name": "useTaskMutationsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation useTaskMutationsDeleteMutation(\n  $id: Int!\n) {\n  deleteTask(id: $id) {\n    task {\n      id\n      title\n    }\n    errorMessage\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "122f379c76cc3cad300abc6b2c1e5c79";

export default node;
