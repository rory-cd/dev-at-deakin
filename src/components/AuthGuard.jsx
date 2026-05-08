"use client";

import { UserContext } from "@/context/UserContext";
import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingIcon from "@/components/LoadingIcon";

export default function AuthGuard({ children, premiumOnly=false, nonPremiumOnly=false }) {

  const router = useRouter();
  const pathname = usePathname();
  const { isAuthReady, user, userData } = useContext(UserContext);

  // If the user isn't signed in, replace the current route with login
  useEffect(() => {
    const premiumUser = userData?.tier == 'premium';

    if (!isAuthReady) return;

    // Replace with server-side redirection
    if (!user) router.replace(`/login?redirect=${pathname}`);
    else if ((!premiumUser && premiumOnly) || (premiumUser && nonPremiumOnly)) {
      router.back();
    }
  }, [user, router]);

  // Show loading screen until user is defined
  if (!isAuthReady || !user) {
    return (
      <LoadingIcon />
    );
  }

  return <>{children}</>;
}