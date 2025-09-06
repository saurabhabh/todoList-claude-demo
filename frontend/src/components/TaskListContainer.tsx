import React from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay';
import TaskListWithMutations from './TaskListWithMutations';
import { TaskListContainerQuery } from '../relay/__generated__/TaskListContainerQuery.graphql';

const TaskListQuery = graphql`
  query TaskListContainerQuery {
    allTasks {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

const TaskListContainer: React.FC = () => {
  const data = useLazyLoadQuery<TaskListContainerQuery>(
    TaskListQuery,
    {}
  );

  return <TaskListWithMutations data={data} />;
};

export default TaskListContainer;