"use client";

import { useState } from "react";
import PageHeading from "@/components/PageHeading";
import TabGroup from "@/components/TabGroup";
import ArticleForm from "@/components/form/ArticleForm";
import QuestionForm from "@/components/form/QuestionForm";
import AuthGuard from "@/components/AuthGuard";

export default function NewPostPage() {

  // Initial state
  const [postType, setPostType] = useState("question");

  // Form options
  const postTypes = [
    { label: "Question", value: "question" },
    { label: "Article", value: "article" }
  ];

  return (
    <AuthGuard>
      <div className="flex flex-col container mx-auto px-0 sm:px-8">

        <PageHeading title={"New Post"} className="px-5 sm:px-0" />

        {/* POST TYPE SELECTION */}
        <TabGroup
          label="Post type"
          name="postType"
          options={postTypes}
          checkedValue={postType}
          onOptionChange={(name, value) => setPostType(value)}
          className={"w-full sm:w-90"}
        />

        {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
      </div>
    </AuthGuard>
  );
}
