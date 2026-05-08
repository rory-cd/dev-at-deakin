import Link from "next/link";

export default function FooterSupport({ className = "" }) {
  return (
    <div className={`text-md flex flex-col gap-2 ${className}`}>
      <h4 className="text-xl font-[400] tracking-[0.075rem] uppercase font-heading">Support</h4>
      <Link href={'/faq'}>FAQs</Link>
      <Link href={'/help'}>Help</Link>
      <Link href={'/contact'}>Contact Us</Link>
    </div>
  );
}
