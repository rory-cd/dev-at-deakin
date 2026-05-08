import AuthGuard from "@/components/AuthGuard";
import LoadingIcon from "@/components/LoadingIcon";
import QuestionContent from "@/components/questions/QuestionContent";
import { Suspense } from "react";

export default async function QuestionPage({ params }) {

  const { questionId } = await params;

  return (
    <AuthGuard>
      <div className={"container-center mb-30"}>
        <Suspense fallback={<LoadingIcon />}>
          <QuestionContent questionId={questionId} />
        </Suspense>
      </div>
    </AuthGuard>
  );
}