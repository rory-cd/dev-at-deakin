"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiUserLine } from "@remixicon/react";
import { logOut } from "@/libs/firebase";
import SubscribeModal from "@/components/SubscribeModal";

export default function UserMenu() {

  const [open, setOpen] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const { userData } = useContext(UserContext);

  // Log out, then go to homepage
  const handleLogOut = async () => {
    await logOut();
    router.push("/");
  };

  // Goto checkout and close menus
  const handleSubscribe = () => {
    setShowSubscribe(false);
    setOpen(false);
    router.push("/premium/checkout");
  };

  // Set an event listener to close the menu on "outside clicks" 
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // If the menu doesn't contain the click target, close the menu
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    // Add listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Unsubscribe on unmount
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Menu option to prompt free users to upgrade
  const premiumPrompt = () => {
    if (userData?.tier != "premium") return (
      <li className="cursor-pointer hover:text-(--clr-primary)" onClick={() => setShowSubscribe(true)} >
        Get&nbsp;Premium
      </li>
    );
    return null;
  }

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger */}
      <button
        className="hover:text-(--clr-primary) flex items-center gap-2 cursor-pointer"
        onClick={(e) => setOpen(!open)}
      >
        <RiUserLine size={22} />
      </button>
      
      {/* Dropdown */}
      {open && (
        <div className="absolute top-6 p-5 z-50 mt-2 rounded-md right-0 bg-bg-front normal-case font-sans drop-shadow-xl">
          <ul className="flex flex-col gap-3">
            <li className="hover:text-(--clr-primary)">
              <Link href={'/profile'} onClick={() => setOpen(false)}>
                Profile
              </Link>
            </li>
            {premiumPrompt()}
            <li onClick={handleLogOut} className="hover:text-(--clr-primary) cursor-pointer">
              Log&nbsp;out
            </li>
          </ul>
        </div>
      )}

      <SubscribeModal show={showSubscribe} onSubscribe={handleSubscribe} onClose={() => setShowSubscribe(false)} />
    </div>
  );
}