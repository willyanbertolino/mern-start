import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalProvider } from './context/global_context';
import { AuthProvider } from './context/auth_context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  Home,
  PrivateRoute,
  Error,
  Login,
  Register,
  Verify,
  Users,
  User,
  Admin,
  Dashboard,
} from './pages';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="user/verify-email" element={<Verify />} />
              <Route path="private" element={<PrivateRoute />}>
                <Route path="users" element={<Users />}>
                  <Route path=":userId" element={<User />} />
                </Route>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="admin" element={<Admin />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
