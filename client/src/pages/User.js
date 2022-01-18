import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../context/auth_context';
import { Links } from '../components';

const User = () => {
  const {
    user: { name },
  } = useAuthContext();

  const params = useParams();

  return (
    <div>
      Hello, {name}
      Your id is: {params.userId}{' '}
      <Links path="/" name="logout">
        Logout
      </Links>
    </div>
  );
};

export default User;
