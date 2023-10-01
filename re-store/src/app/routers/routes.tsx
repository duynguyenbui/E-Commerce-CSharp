import { Navigate, createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home/HomePage';
import Catalog from '../pages/catalog/Catalog';
import ProductDetails from '../pages/catalog/ProductDetails';
import { AboutPage } from '../pages/about/AboutPage';
import { ContactPage } from '../pages/contact/ContactPage';
import App from '../layout/App';
import { ServerError } from '../errors/ServerError';
import { NotFound } from '../errors/NotFound';
import { BasketPage } from '../pages/basket/BasketPage';
import Login from '../pages/account/Login';
import Register from '../pages/account/Register';
import RequireAuth from './RequireAuth';
import Orders from '../pages/orders/Order';
import CheckoutWrapper from '../pages/checkout/CheckoutWrapper';
import Inventory from '../pages/admin/Inventory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // authenticate
      {
        element: <RequireAuth />,
        children: [
          { path: 'checkout', element: <CheckoutWrapper /> },
          { path: 'orders', element: <Orders /> },
        ],
      },
      // admin
      {
        element: <RequireAuth roles={['Admin']} />,
        children: [{ path: 'Inventory', element: <Inventory /> }],
      },
      { path: '', element: <HomePage /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'catalog/:id', element: <ProductDetails /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'server-error', element: <ServerError /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'basket', element: <BasketPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
