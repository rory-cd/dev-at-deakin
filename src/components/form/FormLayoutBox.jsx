export default function FormLayoutBox({ children, className="grid-cols-1" }) {
  return (
    <div className={`bg-bg-front p-6 grid gap-6 ${className}`}>
      {children}
    </div>
  );
}