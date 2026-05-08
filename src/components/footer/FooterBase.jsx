import Logo from "@/components/Logo";

export default function FooterSupport({ className = "" }) {
  return (
    <div className={`text-md flex flex-col gap-2 pt-7 pb-5 ${className}`}>
      <Logo onPrimaryBG={true} className="mx-auto" />
      <div className="mx-auto flex gap-5">
        <a>Privacy Policy</a>
        <a>Terms</a>
        <a>Code of Conduct</a>
      </div>
    </div>
  );
}
