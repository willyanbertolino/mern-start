import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global_context';
import { useAuthContext } from '../context/auth_context';

const Links = ({ path, name, className, children }) => {
  const { activateLink } = useGlobalContext();
  const { logoutUser } = useAuthContext();

  const handleClick = () => {
    if (name === 'logout') {
      return logoutUser();
    }

    return activateLink(name);
  };

  return (
    <Link to={path} className={className} onClick={handleClick}>
      {children || name}
    </Link>
  );
};

export default Links;
