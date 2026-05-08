import AuthGuard from "@/components/AuthGuard";
import LoadingIcon from "@/components/LoadingIcon";
import ArticleContent from "@/components/articles/ArticleContent";
import { Suspense } from "react";

export default async function ArticlePage({ params }) {

  const { articleId } = await params;

  return (
    <AuthGuard>
      <div className={`container-center mb-30`}>
        <Suspense fallback={<LoadingIcon />}>
          <ArticleContent articleId={articleId} />
        </Suspense>
      </div>
    </AuthGuard>
  );
}