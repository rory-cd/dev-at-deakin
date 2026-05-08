import { getUserDoc } from "@/libs/firebase";
import Image from "next/image";

export default async function UserContent({ userId }) {

  const userData = await getUserDoc(userId);

  // Convert tier to title case
  const tier = userData?.tier.charAt(0).toUpperCase() + userData?.tier.slice(1);

  // Styles for title/data
  const labelStyle = "text-text-secondary";
  const valueStyle = "pl-2";

  return (
    <div>
      <div className="relative h-40 w-40 flex-none bg-bg-mid mb-10">
        <Image src={userData.photoURL} fill className="object-cover" alt="User profile image" />
      </div>

      {/* Data */}
      <dl className="grid grid-cols-[10%_90%] gap-3">
        <dt className={labelStyle}>Name:</dt>
        <dd className={valueStyle}>{userData?.name}</dd>

        <dt className={labelStyle}>Email:</dt>
        <dd className={valueStyle}>{userData?.email}</dd>

        <dt className={labelStyle}>Membership tier:</dt>
        <dd className={valueStyle}>
          {tier}
        </dd>
      </dl>
    </div>
  );
}