import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FormRow, Links } from '../components';
import { useGlobalContext } from '../context/global_context';
import { useAuthContext } from '../context/auth_context';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { saveUser } = useAuthContext();
  const { alert, showAlert, hideAlert, activateLink } = useGlobalContext();
  let navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  async function loginRequest() {
    setLoading(true);
    const { email, password } = values;
    const loginUser = { email, password };

    try {
      const { data } = await axios.post(`/api/v1/auth/login`, loginUser);
      setValues({ email: '', password: '' });
      showAlert({
        text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
        type: 'success',
      });
      saveUser(data.user);
      activateLink('dashboard');
      navigate(`/private/dashboard`);
      setLoading(false);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    loginRequest();
  };

  useEffect(() => {
    let cancel = false;
    hideAlert();
    return () => (cancel = true);
  }, []);

  return (
    <Wrapper className="page">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}

      <form
        className={loading ? 'form form-loading' : 'form'}
        onSubmit={onSubmit}
      >
        <h3>Login</h3>
        {/* User email */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* User password */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <p>
          Don't have an account?
          <Links path="/register" name="sign up" className="register-link" />
        </p>
        <p>
          Forgot your password?
          <Links
            path="/forgot-password"
            name="change password"
            className="reset-link"
          />
        </p>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  place-items: center;

  h3 {
    text-align: center;
  }

  p {
    margin: 0;
    text-align: center;
  }

  .btn {
    margin-bottom: 1.5rem;
  }

  .register-link,
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }

  .reset-link {
    margin-top: 0.25rem;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
`;

export default Login;
