import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { useQuery } from 'react-query';

const fetchUsers = async () => {
  const res = await fetch('https://reqres.in/api/users/');
  return res.json();
};

const UserList: React.VFC = (props) => {
  const { data, isLoading } = useQuery('users', fetchUsers);
  const users = data?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>User List</h1>
      <div className="flex">
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  {user.first_name} {user.last_name}
                </p>
                <p>{user.email}</p>
                <img key={user.avatar} src={user.avatar} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: UserList,
});

export default UserList;
