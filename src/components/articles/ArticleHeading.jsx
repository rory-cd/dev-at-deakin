"use client";

import BackToAllButton from "@/components/BackToAllButton";

export default function ArticleHeading({ title, subtitle, className = "", backText="" }) {
  return (
    <div className={`text-left ${className}`}>
      <BackToAllButton text="Back to articles" path="/articles" />

      {/* Title */}
      <h1 className="text-[2.5rem] font-[500] font-heading uppercase">
        {title}
      </h1>
      {/* Display subtitle if provided */}
      {subtitle && <p className="mt-2 text-text-secondary">// &nbsp;&nbsp;{subtitle}</p>}
    </div>
  );
}