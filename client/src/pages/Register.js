import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormRow } from '../components';
import api from '../utils/constants';
import { useState } from 'react';
import { useGlobalContext } from '../context/global_context';

const Register = () => {
  const [values, setValues] = useState({ name: '', email: '', password: '' });

  const {
    loading,
    load,
    loaded,
    alert,
    showAlert,
    hideAlert,
  } = useGlobalContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // hideAlert();
  };

  return (
    <Wrapper className="page">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      <h1>Sign Up</h1>
      <FormRow />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;
`;

export default Register;
