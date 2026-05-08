import { getMostRecentFrom, getAllMostRecentFrom } from "@/libs/firebase";
import ArticleCard from "@/components/articles/ArticleCard";

export default async function ArticleCardList({ count, filters }) {

  let articles = count ? await getMostRecentFrom("articles", count) : await getAllMostRecentFrom("articles");

  if (filters) {

    const { title, startDate, endDate, tags } = filters;

    articles = articles.filter((p) => {
      // Filter out titles
      if (title && !p.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }

      // Filter out dates
      if (startDate && p.date <= startDate) {
        return false;
      }

      if (endDate && p.date > endDate) {
        return false;
      }

      // Filter out tags
      const filterTags = tags ? tags.split(",") : [];

      if (filterTags.length && !filterTags.every((tag) => p.tags.includes(tag)))
      {
        return false;
      }

      return true;
    });
  }

  return (
    <div className="mb-15 grid w-full grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3 xl:gap-20">
      {articles.map((a) => (
        <ArticleCard
          key={a.id}
          data={a}
          className="w-full cursor-pointer"
        />
      ))}
    </div>
  );
}
