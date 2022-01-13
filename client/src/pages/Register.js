import styled from 'styled-components';
import { FormRow, Links } from '../components';
import { api } from '../utils/constants';
import { useState } from 'react';
import { useGlobalContext } from '../context/global_context';
import { useAuthContext } from '../context/auth_context';

const Register = () => {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { alert, showAlert, hideAlert } = useGlobalContext();
  const { verification, setVerification } = useAuthContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    hideAlert();
    setLoading(true);

    const { name, email, password } = values;
    const registerNewUser = { name, email, password };

    try {
      const { data } = await api.post('/api/v1/auth/register', registerNewUser);

      setValues({ name: '', email: '', password: '' });
      setVerification();
      showAlert({ text: data.msg, type: 'success' });
    } catch (error) {
      const { msg } = error.response.data;
      showAlert({ text: msg });
    }
    setLoading(false);
  };

  return (
    <Wrapper className="page">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!verification && (
        <form
          className={loading ? 'form form-loading' : 'form'}
          onSubmit={onSubmit}
        >
          <h3>Sign Up</h3>
          {/* User name */}
          <FormRow
            type="name"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
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
            {loading ? 'Loading...' : 'Register'}
          </button>
          <p>
            Already have an account?
            <Links path="/login" name="login" className="login-link" />
          </p>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;

  h3 {
    text-align: center;
  }

  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .btn:disabled {
    cursor: not-allowed;
  }

  input {
    margin-bottom: 1rem;
  }
`;

export default Register;
