import { Link, Outlet } from 'react-router-dom';
import { Button } from './components/button';
import { Loader } from './components/loader';
import { useLoader } from './hooks/useLoader';

export function App() {
  const { isLoading, createLoader, resetAll } = useLoader();

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className='h-full bg-gradient-to-b from-indigo-200 to-red-100'>
        <nav className="border-b border-solid border-gray-300 flex flex-wrap items-center justify-center py-2 space-x-2 space-y-2">
          <Link className="outline-none" to={''}>
            <Button>Home Page</Button>
          </Link>
          <Link className="outline-none" to={`login`}>
            <Button layout="secondary">Login Page</Button>
          </Link>
          <Button
            layout="secondary"
            onClick={() => {
              const loader = createLoader();
              setTimeout(() => loader.complete(), 3000);
            }}
          >
            Start Loading
          </Button>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default App;
