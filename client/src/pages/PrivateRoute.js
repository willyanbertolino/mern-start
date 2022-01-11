import { Navigate, Outlet } from 'react-router-dom';

import { useGlobalContext } from '../context/global_context';

const PrivateRoute = () => {
  const { user } = useGlobalContext();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
