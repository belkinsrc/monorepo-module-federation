import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/components/App';
import { Suspense } from 'react';
import { LazyShop } from '@/pages/shop/Shop.lazy';
import { UserCard } from '@packages/shared/src/components/UserCard';

const routes = [
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop/main',
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyShop />
          </Suspense>
        ),
      },
      {
        path: '/shop/second',
        element: (
          <Suspense fallback={'Loading...'}>
            <div style={{ color: 'red' }}>
              <h1>second page</h1>
              <UserCard username={'FROM SHOP'} />
            </div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
