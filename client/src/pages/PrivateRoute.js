import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../context/auth_context';

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
