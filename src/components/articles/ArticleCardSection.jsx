import SectionHeading from "@/components/SectionHeading";
import ArticleCardList from "@/components/articles/ArticleCardList";
import LinkButtonPrimary from "@/components/LinkButtonPrimary";
import { Suspense } from "react";
import ArticleCardListSkeleton from "./ArticleCardListSkeleton";

export default function ArticleCardSection({ title, subtitle, cta, count, className }) {

  return (
    <section
      className={`mt-4 flex flex-col items-center px-5 md:px-10 container-center ${className}`}
    >
      {/* Heading */}
      <SectionHeading title={title} subtitle={subtitle} className="mb-4 self-start" />

      {/* Card list */}
      <Suspense fallback={<ArticleCardListSkeleton count={count} />}>
        <ArticleCardList count={count} />
      </Suspense>

      {/* Call to action */}
      <LinkButtonPrimary path='/articles'>
        {cta}
      </LinkButtonPrimary>
    </section>
  );
}
