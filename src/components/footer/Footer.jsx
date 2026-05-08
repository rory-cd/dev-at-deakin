import FooterExplore from "@/components/footer/FooterExplore";
import FooterSupport from "@/components/footer/FooterSupport";
import FooterSocials from "@/components/footer/FooterSocials";
import FooterBase from "@/components/footer/FooterBase";

export default function Footer({ className = "" }) {
  return (
    <footer className={`bg-(--clr-primary-dark) py-10 font-text-on-colour ${className}`}>
      <div className="grid grid-cols-3 container-center">
        <FooterExplore />
        <FooterSupport />
        <FooterSocials />
        <FooterBase className="col-span-full" />
      </div>
    </footer>
  );
}
