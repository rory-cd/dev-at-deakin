export default function FormBackgroundBox({ children, className="" }) {
  return (
    <div className={`bg-bg-mid) flex flex-col mb-20 gap-5 p-5 sm:p-10 w-full h-full mid-dark-v-gradient ${className}`}>
      {children}
    </div>
  );
}