import React from 'react';
import UserList from '../components/UserList';
import reactQueryClient from '../reactQueryClient';
import { QueryClientProvider } from 'react-query';

const ExposedUserList = (props) => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <UserList {...props} />
    </QueryClientProvider>
  );
};

export default ExposedUserList;
