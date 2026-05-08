"use client";

import { useState, useEffect, useContext } from "react";
import { RiCheckLine, RiCloseLine } from "@remixicon/react";
import LoadingIcon from "@/components/LoadingIcon";
import { UserContext } from "@/context/UserContext";

export default function CheckoutCompleteContent({ sessionId }) {

  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user, updateUserData } = useContext(UserContext);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch(`/api/stripe/session-status?session_id=${sessionId}`);
      const data = await res.json();
      setPaymentStatus(data.status);
      setIsLoading(false);
    }

    if (sessionId) fetchStatus();
  }, []);

  useEffect(() => {
    // Set user to premium
    if (user && paymentStatus === 'complete') {
      updateUserData("tier", "premium");
    }
  }, [paymentStatus, user]);
  
  if (isLoading) return <LoadingIcon />;

  return (
    <div className="flex flex-row items-center gap-3">
      {paymentStatus === 'complete' ? (
        <div className="flex flex-row items-center gap-3">
          <RiCheckLine className="text-green-400" size={30} />
          <p>Your payment has been successfully processed, and you now have access to the full range of premium benefits.</p>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-3">
          <RiCloseLine className="text-red-700" size={30} />
          <p>Your payment was unsuccessful. Please try again or contact a staff member for help.</p>
        </div>
      )}
    </div>
  );
}