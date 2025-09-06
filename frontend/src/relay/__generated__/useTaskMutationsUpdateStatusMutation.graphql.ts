/**
 * @generated SignedSource<<c534f8cf5c6f6f8cd264e34342b7e2de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "PENDING" | "%future added value";
export type UpdateTaskStatusInput = {
  id: number;
  status: TaskStatus;
};
export type useTaskMutationsUpdateStatusMutation$variables = {
  input: UpdateTaskStatusInput;
};
export type useTaskMutationsUpdateStatusMutation$data = {
  readonly updateTaskStatus: {
    readonly errorMessage: string | null | undefined;
    readonly success: boolean;
    readonly task: {
      readonly createdAt: string;
      readonly description: string | null | undefined;
      readonly id: number;
      readonly status: TaskStatus;
      readonly title: string;
      readonly updatedAt: string;
    } | null | undefined;
  };
};
export type useTaskMutationsUpdateStatusMutation = {
  response: useTaskMutationsUpdateStatusMutation$data;
  variables: useTaskMutationsUpdateStatusMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TaskPayload",
    "kind": "LinkedField",
    "name": "updateTaskStatus",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
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
    "name": "useTaskMutationsUpdateStatusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useTaskMutationsUpdateStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0a2efc541f8668c7558b3de01674c1c8",
    "id": null,
    "metadata": {},
    "name": "useTaskMutationsUpdateStatusMutation",
    "operationKind": "mutation",
    "text": "mutation useTaskMutationsUpdateStatusMutation(\n  $input: UpdateTaskStatusInput!\n) {\n  updateTaskStatus(input: $input) {\n    task {\n      id\n      title\n      description\n      status\n      createdAt\n      updatedAt\n    }\n    errorMessage\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "1df29780690289f632edd8d7ed8bd6eb";

export default node;
