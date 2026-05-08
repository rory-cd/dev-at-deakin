"use client";

import { RiSearchLine } from "@remixicon/react";
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Searchbar({ className = "" }) {

  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [term, setTerm] = useState("");

  return (
    <div
      className={`flex items-center ${isFocused ? "border-(--clr-primary)" : "border-transparent"} border-2 transition-all ease-in-out rounded-full bg-bg-front px-5 py-2 ${className}`}
    >
      <RiSearchLine size={22} className="text-text-secondary" />
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="ml-4 grow group peer focus:border-none focus:border-2 focus:outline-none placeholder-text-tertiary"
        placeholder="Type to search"
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setTerm("");
            router.push(`/search/${term}`);
          }
        }}
      />
    </div>
  );
}