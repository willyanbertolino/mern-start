import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { useAuthContext } from '../context/auth_context';
import { useGlobalContext } from '../context/global_context';
import Links from './Links';

const Navbar = () => {
  const { user, verification } = useAuthContext();
  const { activeLink } = useGlobalContext();

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
              <Links
                path="/private/dashboard"
                name="dashboard"
                className={activeLink === 'dashboard' ? 'active' : null}
              />
              <Links
                path={`/private/user/${user.userId}`}
                name="myAccount"
                className={activeLink === 'myAccount' ? 'active' : null}
              />
            </>
          ) : (
            !verification && (
              <>
                <Links
                  path="/login"
                  name="login"
                  className={activeLink === 'login' ? 'active' : null}
                />
                <Links
                  path="/register"
                  name="sign up"
                  className={activeLink === 'sign up' ? 'active' : null}
                />
              </>
            )
          )}
        </div>
      </nav>
      <Outlet />
    </Wrapper>
  );
};

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
    width: 12rem;
    display: flex;
    justify-content: space-around;
    text-transform: capitalize;
  }

  .active {
    color: var(--primary-500);
    border-bottom: 1px solid var(--primary-500);
  }
`;

export default Navbar;
