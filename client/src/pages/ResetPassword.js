import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import FormRow from '../components/FormRow';
import { useGlobalContext } from '../context/global_context';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const { alert, showAlert, hideAlert, activateLink } = useGlobalContext();
  let navigate = useNavigate();

  const query = useQuery();

  const handleChange = async (e) => {
    setPassword(e.target.value);
  };

  async function resetPasswordRequest() {
    setLoading(true);

    try {
      await axios.post('/api/v1/auth/reset-password', {
        password,
        token: query.get('token'),
        email: query.get('email'),
      });

      setPassword('');
      setLoading(false);
      setShowForm(false);

      showAlert({
        text: `Success, redirecting to login page shortly`,
        type: 'success',
      });

      activateLink('login');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
      setTimeout(() => {
        navigate('/forgot-password');
      }, 3000);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPasswordRequest();
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
      {showForm && (
        <form
          className={loading ? 'form form-loading' : 'form'}
          onSubmit={handleSubmit}
        >
          <h3>reset password</h3>
          {/* single form row */}
          <FormRow
            type="password"
            name="password"
            value={password}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? 'Please Wait...' : 'New Password'}
          </button>
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
`;

export default ResetPassword;
