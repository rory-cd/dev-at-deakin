import LoadingIcon from "@/components/LoadingIcon";
import PageHeading from "@/components/PageHeading";
import SearchResults from "@/components/search/SearchResults";
import { Suspense } from "react";

export default async function SearchPage({ params }) {

  const { searchTerm } = await params;

  return (
    <div className="container-center mb-30">
      <PageHeading title="Search" subtitle="Search for articles and questions of interest" />
      <div className="p-5 md:p-10 mid-dark-v-gradient">
        <Suspense fallback={<LoadingIcon />}>
            <SearchResults term={searchTerm} />
        </Suspense>
      </div>
    </div>
  );
}