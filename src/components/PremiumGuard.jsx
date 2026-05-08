"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function PremiumGuard({ children, reverse=false }) {

  const { isAuthReady, userData } = useContext(UserContext);

  // Hide content unless user is Premium tier
  let allowed = isAuthReady && userData?.tier == "premium";
  if (reverse) allowed = !allowed;

  if (!allowed) return null;

  return <>{children}</>;
}