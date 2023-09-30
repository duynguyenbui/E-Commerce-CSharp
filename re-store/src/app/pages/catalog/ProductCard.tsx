import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '../../models';
import { Avatar, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { addBasketItemAsync } from '../../store/basketSlice';

export const ProductCard = ({ product }: { product: Product }) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'success.light' },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contain',
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="primary" variant="h5">
          {(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status == 'pendingAddItem' + product.id}
          size="small"
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id }))
          }
          color="success"
        >
          Add to Cart
        </LoadingButton>
        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          size="small"
          color="success"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};
