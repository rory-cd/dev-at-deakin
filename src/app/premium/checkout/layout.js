"use client";

import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function CheckoutLayout({ children }) {
  const promise = useMemo(() => {
    return fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const appearance = {
    theme: 'stripe',

    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
    }
  };

  return (
    <div>
      <CheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: () => promise,
          elementsOptions: {appearance},
        }}
      >
        {children}
      </CheckoutProvider>
    </div>
  )
}