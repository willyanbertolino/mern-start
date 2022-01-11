import styled from 'styled-components';

const Home = () => {
  return (
    <Wrapper className="page">
      <h1>Welcome to MyApp</h1>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;
`;

export default Home;
