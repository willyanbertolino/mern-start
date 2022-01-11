import { useGlobalContext } from './context/global_context';
import { useAuthContext } from './context/auth_context';
import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';
import logo from './assets/logo.png';

function App() {
  const { loading } = useGlobalContext();
  const { user } = useAuthContext();

  if (loading) {
    return (
      <section className="page page-center">
        <div className="loading"></div>
      </section>
    );
  }

  return (
    <Wrapper>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h3>myApp</h3>
        </div>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/private/dashboard">dashboard</Link>
              <Link to={`/private/users/123`}>user</Link>
            </>
          ) : (
            <>
              <Link to="/login">login</Link>
              <Link to="/register">sign up</Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 90vw;
  height: 6rem;
  margin: 0 auto;

  .navbar {
    height: 100%;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
  }
  .logo img {
    height: 60px;
  }
  .logo h3 {
    margin: 1rem;
  }

  .nav-links {
    width: 16rem;
    display: flex;
    justify-content: space-around;
  }
`;

export default App;
