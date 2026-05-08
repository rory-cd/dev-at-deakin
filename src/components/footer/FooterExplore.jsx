import Link from "next/link";

export default function FooterExplore({ className = "" }) {
  return (
    <div className={`text-md flex flex-col gap-2 ${className}`}>
      <h4 className="text-xl font-heading tracking-[0.075rem] font-[400] uppercase">Explore</h4>
      <Link href={'/'}>Home</Link>
      <Link href={'/questions'}>Questions</Link>
      <Link href={'/articles'}>Articles</Link>
    </div>
  );
}
