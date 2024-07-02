import { Link, Outlet } from 'react-router-dom';
import { Button } from './components/button';
import { useState } from 'react';
import { Loader } from './components/loader';
// import { Button } from '@headlessui/react';

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div>
        <nav className="border-b border-solid border-gray-300 flex flex-wrap items-center justify-center py-2 space-x-2 space-y-2">
          <Link className="outline-none" to={''}>
            <Button>Home Page</Button>
          </Link>
          <Link className="outline-none" to={`login`}>
            <Button layout="secondary">Login Page</Button>
          </Link>
          <Button
            layout="secondary"
            onClick={() => setIsLoading((isLoading) => !isLoading)}
          >
            Start Loading
          </Button>
        </nav>
        <Outlet />
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
}

export default App;
