export default function ButtonSecondary({
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
        relative group cursor-pointer rounded-full [word-spacing:0.05rem] bg-(--clr-secondary)
        px-8 py-2 text-sm text-text-on-colour font-[500] uppercase tracking-widest hover:bg-(--clr-secondary-light)
        ${className}`}
    >
      <div className="relative z-25">
        {children}
      </div>
    </button>
  );
}
