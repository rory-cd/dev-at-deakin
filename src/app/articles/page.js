import PageHeading from "@/components/PageHeading";
import AuthGuard from "@/components/AuthGuard";
import PostFilter from "@/components/PostFilter";
import ArticleCardList from "@/components/articles/ArticleCardList";
import ArticleCardListSkeleton from "@/components/articles/ArticleCardListSkeleton";
import { Suspense } from "react";

export default async function ArticlesPage({ searchParams }) {

  const filters = await searchParams;

  return (
    <AuthGuard>
      <section
        className={"container-center mb-30"}
      >
        {/* Heading */}
        <PageHeading title={"Articles"} subtitle={"From other students"} />

        {/* Container */}
        <div className="mt-4 flex flex-col items-center px-5 md:px-10 container-center mid-dark-v-gradient pt-9">
          <div className="w-full">
            {/* Filters */}
            <PostFilter initialFilters={filters} className="mb-10" />

            {/* Cards */}
            <Suspense fallback={<ArticleCardListSkeleton />}>
              <ArticleCardList filters={filters} />
            </Suspense>
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}