"use client";

import { useRouter } from "next/navigation";
import { FaXmark } from "react-icons/fa6";

export default function TagPill({ name, onRemove, path }) {
  const router = useRouter();

  return (
    <div
      onClick={() => path && router.push(path)}
      className={`
        ${path ? "cursor-pointer hover:bg-bg-back" : ""}
        ${onRemove ? "pr-4" : "pr-5"}
        bg-bg-mid inset-ring-1 inset-ring-(--clr-primary)
        lowercase flex flex-row justify-center items-center text-sm tracking-wide gap-1.5 rounded-full pl-5 py-1`}
    >
      {name}
      
      {/* If an onRemove function is provided, render a cross */}
      {onRemove &&
        <FaXmark
          onClick={() => onRemove(name)}
          className="text-xs text-(--clr-primary) cursor-pointer"
        />
      }
    </div>
  );
}