"use client";

import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js/checkout';
import ButtonSecondary from "@/components/ButtonSecondary";
import PageHeading from "@/components/PageHeading";
import LoadingIcon from "@/components/LoadingIcon";
import AuthGuard from "@/components/AuthGuard";

export default function CheckoutPage() {

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(UserContext);

  const checkoutState = useCheckout();
  
  // Handle loading/errors
  if (checkoutState.type === 'loading') {
    return (
      <LoadingIcon />
    );
  } else if (checkoutState.type === 'error') {
    return (
      <div className="container-center">Error: {checkoutState.error.message}</div>
    );
  }
  
  const {checkout} = checkoutState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Set payment email to current user's email
      const updateResult = await checkout.updateEmail(userData?.email);

      if (updateResult.type === "error") {
        setMessage(updateResult.error.message);
        setIsLoading(false);
        return;
      }

      const confirmResult = await checkout.confirm();

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, the customer will be redirected to
      // the `return_url`.
      if (confirmResult.type === 'error') {
        setMessage(confirmResult.error.message);
      }
      } catch (err) {
        setMessage(err.message || "Something went wrong.")
      }

    setIsLoading(false);
  };

  return (
    <AuthGuard nonPremiumOnly>
      <div className="container-center relative">
        {/* Checkout form */}
        <form onSubmit={handleSubmit} className="max-w-150 mx-auto flex flex-col ">
          <PageHeading title={"Checkout"} />
          <PaymentElement id="payment-element" />
          <div className="mt-6 flex justify-between items-center border-t border-text-tertiary border-b py-4 px-2">
            <span>Premium subscription</span>
            <p className="text-right">
              <span className="text-2xl font-bold">{checkout.total.total.amount}</span>
              <br/>per month
            </p>
          </div>
          <ButtonSecondary disabled={isLoading} id="submit" type="submit" className="mx-auto mt-5">
            Pay now
          </ButtonSecondary>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
        {/* Loading submission */}
        {isLoading && <div className="absolute inset-0 bg-bg-back/70 flex items-center justify-center z-50">
          <LoadingIcon />
        </div>}
      </div>
    </AuthGuard>
  );
}
