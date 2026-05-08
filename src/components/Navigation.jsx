"use client";

import Link from "next/link";
import { RiUserLine, RiFileAddLine } from "@remixicon/react";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import UserMenu from "@/components/UserMenu";
import PremiumGuard from "@/components/PremiumGuard";

export default function Navigation({ className = "" }) {

  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <div className={`flex gap-7 uppercase tracking-wider font-heading font-[500] ${className}`}>
      <PremiumGuard reverse={true}>
        <Link href={'/plans'} className="hover:text-(--clr-primary) flex items-center gap-2">
          Plans
        </Link>
      </PremiumGuard>
      {user ? (
        <>
          <Link href={'/new-post'} className="hover:text-(--clr-primary) flex items-center gap-2">
            <RiFileAddLine size={22} />
            Post
          </Link>
          <Link href={'/questions'} className="hover:text-(--clr-primary) flex items-center gap-2">
            Questions
          </Link>
          <Link href={'/articles'} className="hover:text-(--clr-primary) flex items-center gap-2">
            Articles
          </Link>
          <UserMenu />
        </>
      ) : (
        <button
          className="hover:text-(--clr-primary) flex items-center gap-2 uppercase cursor-pointer"
          onClick={() => router.push('/login')}
        >
          <RiUserLine size={22} />
          Login
        </button>
      )}
    </div>
  );
}
