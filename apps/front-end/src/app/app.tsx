import { Outlet } from 'react-router-dom';
import { Loader } from './components/loader';
import { AppConfig } from './appConfig';
import { DialogContainer } from './components/dialog';

export function App() {
    return (
        <AppConfig>
            <Loader />
            <DialogContainer />
            <div className="h-full bg-gradient-to-b from-indigo-200 to-red-100">
                {/* <nav className="border-b border-solid border-gray-300 flex flex-wrap items-center justify-center py-2 space-x-2">
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
          </nav> */}
                <Outlet />
            </div>
        </AppConfig>
    );
}

export default App;
