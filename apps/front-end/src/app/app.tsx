import { Link, Outlet } from 'react-router-dom';
import { Button } from './components/button';
// import { Button } from '@headlessui/react';

export function App() {
  return (
    <div>
      <nav className="border-b border-solid border-gray-300 flex items-center justify-center py-2 space-x-2">
        <Link className="outline-none" to={''}>
          <Button>Home Page</Button>
        </Link>
        <Link className="outline-none" to={`login`}>
          <Button layout="secondary">Login Page</Button>
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
