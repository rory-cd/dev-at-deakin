import PageHeading from "@/components/PageHeading";
import AuthGuard from "@/components/AuthGuard";
import PostFilter from "@/components/PostFilter";
import { Suspense } from "react";
import QuestionCardList from "@/components/questions/QuestionCardList";
import QuestionCardListSkeleton from "@/components/questions/QuestionCardListSkeleton";

export default async function QuestionsPage({ searchParams }) {

  const filters = await searchParams;

  return (
    <AuthGuard>
      <section className={"container-center mb-30"}>
        {/* Heading */}
        <PageHeading title={"Questions"} subtitle={"From other students"} />

        {/* Container */}
        <div className="mt-4 flex flex-col items-center px-5 md:px-10 container-center mid-dark-v-gradient pt-9">
          <div className="w-full">
            {/* Filters */}
            <PostFilter initialFilters={filters} className="mb-10" />

            {/* Cards */}
            <Suspense fallback={<QuestionCardListSkeleton />}>
              <QuestionCardList filters={filters} />
            </Suspense>
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}