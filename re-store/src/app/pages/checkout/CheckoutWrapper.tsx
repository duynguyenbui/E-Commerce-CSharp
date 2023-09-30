import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './CheckoutPage';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/configureStore';
import agent from '../../api/agent';
import { setBasket } from '../../store/basketSlice';
import { LoadingComponent } from '../../layout/Loading';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51NvsclFlZ3RotrvS1pktVSNWiSG6UwkM5WLRC4jcC79TwlpqGe7iaO7rJ6K9awRjAOnJ79G3u0yEKr3loSmHkCSQ00qLxZSwAK'
);

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent message='Loading checkout...'/>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
