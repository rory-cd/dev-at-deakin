export default function Logo({ onPrimaryBG = false, className = "" }) {
  return (
    <div className={`text-3xl font-bold ${className}`}>
      <span className={`${onPrimaryBG ? "text-bg-mid" : "text-(--clr-primary)"}`}>
        &gt;
      </span>
      &nbsp;DEV
      <span className={`${onPrimaryBG ? "text-bg-mid" : "text-(--clr-primary)"}`}>
        @
      </span>
      Deakin
    </div>
  );
}