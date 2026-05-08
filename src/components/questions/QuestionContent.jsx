import AuthGuard from "@/components/AuthGuard";
import { getQuestion } from "@/libs/firebase";
import TagPill from "@/components/TagPill";
import UserLink from "@/components/UserLink";
import BackToAllButton from "@/components/BackToAllButton";
import CommentBlock from "@/components/comments/CommentBlock";
import AIHelper from "@/components/AIHelper";

export default async function QuestionContent({ questionId }) {

  const data = await getQuestion(questionId);

  return (
    <AuthGuard>
      <div className="flex flex-col lg:flex-row">
        <div className={"p-5 mt-10 md:p-10 flex flex-row flex-grow mid-dark-v-gradient"}>
          {/* Main content */}
          <div>
            <BackToAllButton text="Back to questions" path="/questions" />
            <p className="text-text-secondary"><UserLink uid={data.author} /> asked</p>
            <h2 className="text-[2.3rem] mb-3 font-bold font-sans">{data.title}</h2>
            <p className="mb-10 max-w-200">{data.description}</p>
            <div className="flex flex-row flex-wrap gap-3">
              {data.tags.length > 0 &&
                <p className="text-text-secondary">Tags:</p>
              }
              {data.tags?.map((tag) =>
                <TagPill
                  key={tag}
                  name={tag}
                  path={`/questions?tags=${tag}`}
                />
              )}
            </div>
            <CommentBlock docId={questionId} collectionName={"questions"} />
          </div>

        </div>
        <AIHelper question={data} />
      </div>
    </AuthGuard>
  );
}