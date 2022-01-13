import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global_context';

const Links = ({ path, name, className, children }) => {
  const { activateLink } = useGlobalContext();

  return (
    <Link to={path} className={className} onClick={() => activateLink(name)}>
      {children || name}
    </Link>
  );
};

export default Links;
