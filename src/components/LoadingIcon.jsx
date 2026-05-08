import { RiLoader4Line } from "@remixicon/react";

export default function LoadingIcon({ className = "" }) {
  return (
    <div className={`${className} flex justify-center items-center w-full h-full`}>
      <RiLoader4Line className="animate-spin mt-14 text-text-tertiary" size={50} />
    </div>
  );
}