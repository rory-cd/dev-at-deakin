import Search from "@/libs/search";
import SearchResultArticle from "@/components/search/SearchResultArticle";
import SearchResultQuestion from "@/components/search/SearchResultQuestion";

export default async function SearchResults({ term }) {

  const { articles, questions, users } = await Search(term);

  const resultCount = articles.length + questions.length + users.length;

  return (
    <div>
      {resultCount === 0 && <>No results found</>}

      {/* Articles */}
      {articles.length > 0 && 
        <>
          <h3 className="font-sans text-[1.2rem] font-bold">
            Articles
          </h3>
          <div className="flex flex-col divide-y divide-text-tertiary">
            {articles.map((a) => (
              <SearchResultArticle key={a.id} data={a} />
            ))}
          </div>
        </>
      }

      {/* Questions */}
      {questions.length > 0 && 
        <>
          <h3 className="font-sans text-[1.2rem] mt-15 font-bold">
            Questions
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-15">
            {questions.map((q) => (
              <SearchResultQuestion key={q.id} data={q} />
            ))}
          </div>
        </>
      }
    </div>
  );
}