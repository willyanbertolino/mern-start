import { useState } from 'react';
import styled from 'styled-components';
import { FormRow } from '../components';
import axios from 'axios';
import { useGlobalContext } from '../context/global_context';
import { useAuthContext } from '../context/auth_context';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { alert, showAlert, hideAlert } = useGlobalContext();
  const { setVerification } = useAuthContext();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerification(false);
    hideAlert();

    try {
      const { data } = await axios.post('/api/v1/auth/forgot-password', {
        email,
      });
      showAlert({ text: data.msg, type: 'success' });
      setVerification(true);
      setShowForm(true);
    } catch (error) {
      const { msg } = error.response.data;
      showAlert({ text: msg });
      setShowForm(false);
    }
    setLoading(false);
  };

  return (
    <Wrapper className="page">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!showForm && (
        <form
          className={loading ? 'form form-loading' : 'form'}
          onSubmit={handleSubmit}
        >
          <h3>Forgot password</h3>
          {/* single form row */}
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? 'Please Wait...' : 'Get Reset Password Link'}
          </button>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  place-items: center;

  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default ForgotPassword;
