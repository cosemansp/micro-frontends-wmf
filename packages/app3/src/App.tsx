import UserList from './components/UserList';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import reactQueryClient from './reactQueryClient';

function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <h1>App3</h1>
      <UserList></UserList>
    </QueryClientProvider>
  );
}

export default App;
