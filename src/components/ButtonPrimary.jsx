export default function ButtonPrimary({
  children,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      className={`relative group rounded-full [word-spacing:0.05rem] bg-(--clr-primary) px-8 py-2 text-sm text-white font-[500] uppercase tracking-widest hover:bg-(--clr-primary-light) ${className}`}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="z-0 w-[70%] h-[80%] rounded-full group-hover:animate-ping bg-(--clr-primary)"></div>
      </div>
      <div className="relative z-50">{children}</div>
    </button>
  );
}
