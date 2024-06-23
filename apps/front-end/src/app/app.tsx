import { Outlet } from 'react-router-dom';
// import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      {/* <NxWelcome title="front-end" /> */}
      <Outlet />
    </div>
  );
}

export default App;
