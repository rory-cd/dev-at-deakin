import LoadingIcon from "@/components/LoadingIcon";
import PageHeading from "@/components/PageHeading";
import UserContent from "@/components/UserContent";
import { Suspense } from "react";

export default async function ArticlePage({ params }) {

  const { userId } = await params;

  return (
    <div className="container-center mb-20">
      <PageHeading title={"User"} />
      <div className="p-5 md:p-10 mid-dark-v-gradient">
        <Suspense fallback={<LoadingIcon />}>
            <UserContent userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}