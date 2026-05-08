export default function FormLabel({ children, input, className="" }) {
  return (
    <label htmlFor={input} className={`block text-[0.85rem] text-text-secondary font-[500] uppercase tracking-[0.1rem] font-heading ${className}`}>
      {children}
    </label>
  );
}