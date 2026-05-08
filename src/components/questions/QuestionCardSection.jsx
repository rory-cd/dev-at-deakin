import SectionHeading from "@/components/SectionHeading";
import LinkButtonPrimary from "@/components/LinkButtonPrimary";
import { Suspense } from "react";
import QuestionCardListSkeleton from "@/components/questions/QuestionCardListSkeleton";
import QuestionCardList from "@/components/questions/QuestionCardList";

export default function QuestionCardSection({ title, subtitle, cta, count, className, allowDelete=false }) {

  return (
    <section
      className={`mt-4 flex flex-col items-center px-5 md:px-10 container-center ${className}`}
    >
      {/* Heading */}
      <SectionHeading title={title} subtitle={subtitle} className="mb-4 self-start" />

      {/* Question list */}
      <Suspense fallback={<QuestionCardListSkeleton count={count} />}>
        <QuestionCardList allowDelete={allowDelete} count={count} />
      </Suspense>

      {/* Call to action */}
      <LinkButtonPrimary path='/questions'>
        {cta}
      </LinkButtonPrimary>
    </section>
  );
}
