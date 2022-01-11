import styled from 'styled-components';

const FormRow = ({ type, name, value, handleChange }) => {
  return (
    <Wrapper>
      <label htmlFor={name} className="form-label">
        {name}
      </label>

      <input
        className="form-input"
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form-label {
    display: block;
    font-size: var(--smallText);
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .form-input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }
`;

export default FormRow;
