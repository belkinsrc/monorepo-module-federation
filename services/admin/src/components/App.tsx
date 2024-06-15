import { Outlet } from 'react-router-dom';

import { UserCard } from '@packages/shared/src/components/UserCard';

export const App = () => {
  return (
    <div>
      <h1>ADMIN MODULE</h1>
      <Outlet />
      <UserCard username={'FROM ADMIN'} />
    </div>
  );
};
