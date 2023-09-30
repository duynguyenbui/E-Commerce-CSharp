import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Header } from './Header';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { LoadingComponent } from './Loading';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../store/basketSlice';
import { fetchCurrentUser } from '../store/accountSlice';
import { HomePage } from '../pages/home/HomePage';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [dispatch, initApp]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline>
        <Header />
        {loading ? (
          <LoadingComponent message="Initializing app..." />
        ) : location.pathname === '/' ? (
          <HomePage />
        ) : (
          <Container sx={{ mt: 4 }}>
            <Outlet />
          </Container>
        )}
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
