import { RiStarFill } from "@remixicon/react";

export default function Rating({ rating, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <RiStarFill size="22" className="mr-[0.35rem] text-yellow-400" />
      <div className="font-bold text-(--text-light)">{rating}</div>
    </div>
  );
}
