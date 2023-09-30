import { Container, Paper, Typography, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Container component={Paper} style={{ height: 400 }} sx={{ padding: 4 }}>
      <Typography gutterBottom variant={'h3'}>
        Oops - Cannot find what your are looking for!
      </Typography>
      <Divider />
      <Button component={Link} to="/catalog" fullWidth>
        Go back to the shop
      </Button>
    </Container>
  );
};
