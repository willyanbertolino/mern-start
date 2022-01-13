import { useAuthContext } from './context/auth_context';
import { Outlet, Link } from 'react-router-dom';
import { Loading, Navbar } from './components';

function App() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="page">
      <Navbar />
    </section>
  );
}

export default App;
