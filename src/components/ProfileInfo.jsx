"use client";

import PremiumGuard from "@/components/PremiumGuard";
import Link from "next/link";
import ThemeChanger from "@/components/ThemeChanger";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import UploadImageBox from "./UploadImageBox";
import { updateProfilePic } from "@/libs/firebase";

export default function ProfileInfo() {

  const { user, userData } = useContext(UserContext);

  // Convert tier to title case
  const tier = userData?.tier
    ? userData?.tier.charAt(0).toUpperCase() + userData?.tier.slice(1)
    : "Free";

  // Styles for title/data
  const labelStyle = "text-text-secondary";
  const valueStyle = "pl-2";

  const setProfilePic = (name, url) => {
    updateProfilePic(url);
  }

  return (
    <div>
      <UploadImageBox
        folder="profiles"
        className="w-40 mb-10"
        defaultUrl={user.photoURL}
        afterUpload={setProfilePic}
        msg="Add profile image"
      />

      {/* Data */}
      <dl className="grid grid-cols-[35%_65%] md:grid-cols-[20%_80%] lg:grid-cols-[10%_90%] gap-3">
        <dt className={labelStyle}>Name:</dt>
        <dd className={valueStyle}>{userData?.name}</dd>

        <dt className={labelStyle}>Email:</dt>
        <dd className={valueStyle}>{userData?.email}</dd>

        <dt className={labelStyle}>Membership:</dt>
        <dd className={valueStyle}>
          {tier}
          <PremiumGuard reverse>
            <Link href={'/premium/checkout'} className="ml-3 text-link">
              Upgrade
            </Link>
          </PremiumGuard>
        </dd>

        <PremiumGuard>
          <dt className={labelStyle}>Theme:</dt>
          <dd><ThemeChanger /></dd>
        </PremiumGuard>
      </dl>
    </div>
  );
}