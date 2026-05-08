"use client";

import TextAreaInput from "@/components/form/TextAreaInput";
import { useState } from "react";
import ButtonSmall from "@/components/ButtonSmall";
import { postComment } from "@/libs/firebase";
import LoadingIcon from "@/components/LoadingIcon";

export default function CommentInput({ collectionName, docId, onPost, className = "" }) {

  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setText(value);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await postComment(docId, collectionName, text);
    onPost();
    setIsSubmitting(false);
  }

  return (
    <div className={`${className} relative mt-10`}>
      <TextAreaInput
        label=""
        name="comment"
        height="6rem"
        value={text}
        onTextChange={handleChange}
        placeholder="Write your comment here"
        className="mb-5"
      />
      <ButtonSmall type="button" onClick={onSubmit}>
        Post comment
      </ButtonSmall>

      {isSubmitting && <LoadingIcon className="absolute inset-0 z-50" />}
    </div>
  );
}