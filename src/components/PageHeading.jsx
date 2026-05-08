export default function PageHeading({ title, subtitle, className = "" }) {
  return (
    <div className={`mb-6 mt-5 sm:mt-10 text-left ${className}`}>
      {/* Title */}
      <h1 className="text-[2.5rem] font-[500] font-heading uppercase">
        {title}
      </h1>
      {/* Display subtitle if provided */}
      {subtitle && <p className="mt-2 text-text-secondary">
        // &nbsp;&nbsp;{subtitle}
      </p>}
    </div>
  );
}