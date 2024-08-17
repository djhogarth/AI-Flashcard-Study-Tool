import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

/* Utility function to ensure only one instance of stripe
    is created, it's reused if it already exists */
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
