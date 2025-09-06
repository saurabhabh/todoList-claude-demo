/**
 * @generated SignedSource<<eadae55288066b4534a4338a6a2ce59b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "PENDING" | "%future added value";
export type CreateTaskInput = {
  description?: string | null | undefined;
  title: string;
};
export type AddTaskFormContainerMutation$variables = {
  input: CreateTaskInput;
};
export type AddTaskFormContainerMutation$data = {
  readonly createTask: {
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
export type AddTaskFormContainerMutation = {
  response: AddTaskFormContainerMutation$data;
  variables: AddTaskFormContainerMutation$variables;
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
    "name": "createTask",
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
    "name": "AddTaskFormContainerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddTaskFormContainerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fd92752cbc594d1da73c7b3e73727b01",
    "id": null,
    "metadata": {},
    "name": "AddTaskFormContainerMutation",
    "operationKind": "mutation",
    "text": "mutation AddTaskFormContainerMutation(\n  $input: CreateTaskInput!\n) {\n  createTask(input: $input) {\n    task {\n      id\n      title\n      description\n      status\n      createdAt\n      updatedAt\n    }\n    errorMessage\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "f73a0abea0dcbfebb62960485a1544a3";

export default node;
