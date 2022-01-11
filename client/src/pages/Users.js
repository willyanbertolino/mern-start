import React from 'react';
import { Outlet } from 'react-router-dom';

const Users = () => {
  return (
    <div>
      <h3>Users</h3>
      <Outlet />
    </div>
  );
};

export default Users;
