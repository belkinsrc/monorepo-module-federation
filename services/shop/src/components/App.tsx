import { Link, Outlet } from 'react-router-dom';
import { shopRoutes } from '@packages/shared/src/routes/shop';

const App = () => {
  return (
    <div>
      <h1>SHOP MODULE</h1>
      <Outlet />
      <Link to={shopRoutes.second}>go to second page</Link>
    </div>
  );
};

export { App };
