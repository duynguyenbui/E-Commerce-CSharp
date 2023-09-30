import { Button, Grid, Typography } from '@mui/material';
import BasketSummary from './BasketSumary';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/configureStore';
import BasketTable from './BasketTable';

export const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <BasketTable items={basket.items} />
      <Grid container mt={2} sx={{ mt: 2 }}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            size="medium"
            fullWidth
            color='success'
            sx={{
              mt: 2,
            }}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
