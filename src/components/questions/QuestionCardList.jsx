import { getMostRecentFrom, getAllMostRecentFrom, getHiddenQuestions } from "@/libs/firebase";
import QuestionCard from "@/components/questions/QuestionCard";

export default async function QuestionCardList({ count, filters, allowDelete }) {

  let questions = count ? await getMostRecentFrom("questions", count) : await getAllMostRecentFrom("questions");
  const hiddenQuestions = await getHiddenQuestions();

  if (filters) {

    const { title, startDate, endDate, tags } = filters;

    questions = questions.filter((q) => {
      // Filter out hidden
      if (hiddenQuestions?.includes(q.id)) {
        return false;
      }

      // Filter out titles
      if (title && !q.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }

      // Filter out dates
      if (startDate && q.date <= new Date(startDate)) {
        return false;
      }

      if (endDate && q.date > new Date(endDate)) {
        return false;
      }

      // Filter out tags
      const filterTags = tags ? tags.split(",") : [];

      if (filterTags.length && !filterTags.every((tag) => q.tags.includes(tag)))
      {
        return false;
      }

      return true;
    });
  }

  return (
    <div className="mb-15 grid w-full grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3 xl:gap-20">
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          data={q}
          className="w-full cursor-pointer"
          allowDelete={allowDelete}
        />
      ))}
    </div>
  );
}