import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routers/routes.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.ts';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
