"use client";

import { getUserDoc } from "@/libs/firebase";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserLink({ uid, className = "" }) {

  const [userData, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = await getUserDoc(uid);
      setUser(userDoc);
    }

    fetchUser();
  }, []);

  if (!userData) return null;

  return (
    <Link
      href={`/user/${userData.uid}`}
      onClick={(e) => e.stopPropagation()}
      className={`${className} text-(--clr-primary)`}
    >
      {userData.name}
    </Link>
  );
}