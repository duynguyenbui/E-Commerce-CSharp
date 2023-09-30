import { Container, Divider, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const ServerError = () => {
  const { state } = useLocation();

  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography gutterBottom variant="h3" color="secondary">
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant="body1">
            {state.error.detail || 'Internal server error'}
          </Typography>
        </>
      ) : null}
      <Typography variant="h5" gutterBottom sx={{ mt: 5 }}>
        Server Error
      </Typography>
    </Container>
  );
};
