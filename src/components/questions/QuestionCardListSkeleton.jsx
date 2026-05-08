import SkeletonCard from "@/components/SkeletonCard";

export default function QuestionCardListSkeleton({ count }) {

  return (
    <div className="mb-15 grid w-full grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3 xl:gap-20">
      {/* Array on undefined to iterate over */}
      {Array.from({ length: count || 6 }).map((_, i) => (
        <SkeletonCard key={i} className={"h-50"} />
      ))}
    </div>
  );
}