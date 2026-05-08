import { RiFacebookFill, RiInstagramLine, RiTwitterFill } from "@remixicon/react";

export default function FooterSocials({ className = "" }) {
  return (
    <div className={`text-md flex flex-col gap-2 ${className}`}>
      <h4 className="text-xl uppercase tracking-[0.075rem] font-[400] font-heading">Stay connected</h4>
      <div className="flex flex-row gap-3 sm:gap-5">
        <RiFacebookFill />
        <RiTwitterFill />
        <RiInstagramLine />
      </div>
    </div>
  );
}
