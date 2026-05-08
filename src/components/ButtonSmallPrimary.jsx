export default function ButtonSmallPrimary({
  children,
  type = "button",
  className = "",
  onClick,
  disabled = false
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group cursor-pointer rounded-full [word-spacing:0.05rem] bg-(--clr-primary-dark)
        px-6 py-2 text-xs text-text-on-colour font-[500] uppercase tracking-widest hover:bg-(--clr-primary)
        ${className}`}
    >
      <div className="relative z-25">
        {children}
      </div>
    </button>
  );
}
