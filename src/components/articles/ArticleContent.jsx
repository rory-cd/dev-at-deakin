import AuthGuard from "@/components/AuthGuard";
import ArticleHeading from "@/components/articles/ArticleHeading";
import TagPill from "@/components/TagPill";
import Image from "next/image";
import ArticleEditorDisplay from "@/components/tiptap/ArticleEditorDisplay";
import FormBackgroundBox from "@/components/form/FormBackgroundBox";
import UserLink from "@/components/UserLink";
import StarRating from "@/components/StarRating";
import { getArticle } from "@/libs/firebase";
import CommentBlock from "@/components/comments/CommentBlock";

export default async function ArticleContent({ articleId }) {
  console.log(articleId);
  const data = await getArticle(articleId);

  return (
    <AuthGuard>
      <div className={`flex flex-col container max-w-[70rem] mx-auto px-0 sm:px-8`}>

        {/* Header */}
        <div className="flex flex-row gap-8 mt-10 mb-8">
          <div className="relative flex-1/3">
            {data.imgUrl &&
              <Image
                src={data.imgUrl}
                alt="Image accompanying the article"
                fill
                className="object-cover rounded"
              />
            }
          </div>
          <div className="flex flex-col flex-2/3">
            <ArticleHeading title={data.title} backText="All articles" />
            <UserLink uid={data.author} />
            <p className="mt-2">{data.abstract}</p>
          </div>
        </div>

        <FormBackgroundBox>
          <ArticleEditorDisplay article={data} readOnly={true} />
          <StarRating
            rating={data.rating}
            articleId={data.id}
            ratingCount={data.ratingCount}
            clickable
          />

          {/* Tags */}
          <div className="flex flex-row flex-wrap gap-3 mt-15">
            {data.tags?.length > 0 &&
              <p className="text-text-secondary">Tags:</p>
            }
            {data.tags?.map((tag) =>
              <TagPill
                key={tag}
                name={tag}
                path={`/articles?tags=${tag}`}
              />
            )}
          </div>

          {/* Comments */}
          <CommentBlock docId={articleId} collectionName={"articles"} />
        </FormBackgroundBox>
      </div>
    </AuthGuard>
  );
}