"use client";

import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from "@remixicon/react";

export default function BackToAllButton({ text, path }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(path)}
      className="flex flex-row items-center text-(--clr-primary) hover:text-(--clr-primary-dark) cursor-pointer mb-4"
    >
      <RiArrowLeftLine size={19} className="mr-1" />
      <div>{text}</div>
    </div>
  );
}