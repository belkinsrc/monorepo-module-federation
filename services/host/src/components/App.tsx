import { Outlet, Link } from 'react-router-dom';
import { adminRoutes } from '@packages/shared/src/routes/admin';
import { shopRoutes } from '@packages/shared/src/routes/shop';

const App = () => {
  return (
    <div>
      <h1>APP</h1>

      <Link to={adminRoutes.about}>About</Link>
      <Link to={shopRoutes.main}>Shop</Link>

      <Outlet />
    </div>
  );
};

export { App };
