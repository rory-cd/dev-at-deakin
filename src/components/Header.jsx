import Link from "next/link";
import Logo from "@/components/Logo";
import Searchbar from "@/components/Searchbar";
import Navigation from "@/components/Navigation";

export default function Header({ className = "" }) {
  return (
    <header
      className={`grid grid-rows-3 grid-cols-1 md:grid-rows-2 md:grid-cols-2 xl:grid-rows-1 xl:grid-cols-3 items-center justify-center md:justify-between gap-2 bg-background-back px-8 py-4 ${className}`}
    >
      <Link href={'/'} className="order-first flex justify-center md:justify-start"><Logo /></Link>
      <Searchbar className="w-full px-4 order-3 md:col-span-2 xl:col-span-1 mt-2 xl:order-2 xl:mt-0" />
      <Navigation className="order-2 justify-center md:justify-end xl:order-3" />
    </header>
  );
}
