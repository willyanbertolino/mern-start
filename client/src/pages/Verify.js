import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuthContext } from '../context/auth_context';
import { Loading, Error, Links } from '../components';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Verify = () => {
  const { isLoading } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    try {
      await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    const msg =
      'There was an error, please double check your verification link';
    return <Error msg={msg} />;
  }

  return (
    <Wrapper className="page">
      <div className="confirmed">
        <h2>Account Confirmed</h2>
        <Links path="/login" name="login" className="btn">
          Please Login
        </Links>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: -3rem;
  display: grid;
  place-items: center;

  .confirmed {
    display: grid;
    text-align: center;
    justify-content: center;
  }
`;

export default Verify;
