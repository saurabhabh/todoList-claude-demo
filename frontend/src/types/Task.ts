export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskStatusInput {
  id: number;
  status: TaskStatus;
}

export interface TaskPayload {
  task?: Task;
  errorMessage?: string;
  success: boolean;
}