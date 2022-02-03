import { useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../context/auth_context';
import { Links, FormRow } from '../components';
import { FaUserAlt, FaPen } from 'react-icons/fa';
import axios from 'axios';

const User = () => {
  const {
    user: { name, userId: id, role, image, email },
  } = useAuthContext();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState({ field: '', value: '' });

  const handleChange = (e) => {
    setFormFields({ ...formFields, value: e.target.value });
  };

  const handleClick = (field, value) => {
    setFormFields({ field, value });
    setShow(true);
  };

  const handleCancelation = () => {
    setShow(false);
    setFormFields({ field: '', value: '' });
  };

  async function updateUser() {
    const { field, value } = formFields;
    const newValues = { id, field, value };
    console.log(newValues);
    try {
      const { data } = await axios.patch('/api/v1/users/updateUser', newValues);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
    setShow(false);
  };

  return (
    <Wrapper className="page">
      {show ? (
        <form onSubmit={handleSubmit} className="formControl">
          <FormRow
            type={formFields.field}
            name={formFields.field}
            value={formFields.value}
            handleChange={handleChange}
          />
          <div className="buttons">
            <button
              type="button"
              className="btn btn-block"
              onClick={handleCancelation}
            >
              cancel
            </button>
            <button type="submit" className="btn btn-block" disabled={loading}>
              {loading ? 'Loading...' : 'Update'}
            </button>
          </div>
        </form>
      ) : (
        <div className="container">
          <div className="img-container">
            {image ? <img src={image} alt="picture" /> : <FaUserAlt />}
          </div>
          <p className="role">{role}</p>
          <div className="info">
            <div className="name">
              <h6>name</h6>
              <p>{name}</p>
            </div>
            <div className="icon" onClick={() => handleClick('name', name)}>
              <FaPen />
            </div>
          </div>
          <div className="info">
            <div className="email">
              <h6>email</h6>
              <p>{email}</p>
            </div>
            <div className="icon" onClick={() => handleClick('email', email)}>
              <FaPen />
            </div>
          </div>

          <Links path="/" name="logout" className="btn">
            Logout
          </Links>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;

  .container {
    display: grid;
    place-items: center;
    width: 100%;
  }

  .img-container {
    font-size: 2rem;
    display: grid;
    place-items: center;
    width: 150px;
    height: 150px;
    margin-bottom: 1rem;
  }

  .role {
    text-transform: capitalize;
  }

  .info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 50px;
    margin-bottom: 1rem;
  }

  .name,
  .email {
    padding: 0 1rem;
  }

  .icon {
    width: 50px;
    display: grid;
    place-items: center;
  }

  .img-container:hover,
  .icon:hover {
    cursor: pointer;
    color: var(--primary-500);
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }

  .buttons button {
    width: 45%;
  }

  .formControl {
    width: 30%;
    padding: 2rem;
  }

  @media screen and (min-width: 500px) {
    .container {
      width: 50%;
    }
  }
`;

export default User;
