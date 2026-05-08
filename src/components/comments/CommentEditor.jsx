"use client";

import TextAreaInput from "@/components/form/TextAreaInput";
import { useState } from "react";
import ButtonSmall from "@/components/ButtonSmall";
import { editComment } from "@/libs/firebase";
import LoadingIcon from "@/components/LoadingIcon";

export default function CommentEditor({ data, onComplete, onCancel, docId, collectionName, className }) {

  const [text, setText] = useState(data.text);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setText(value);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await editComment(data.id, docId, collectionName, text);
    onComplete(text);
    setIsSubmitting(false);
  }

  return (
    <div className={`${className} relative w-full`}>
      <TextAreaInput
        label=""
        name="comment"
        height="5rem"
        value={text}
        onTextChange={handleChange}
        className="mb-5"
      />
      <ButtonSmall type="button" onClick={onSubmit}>
        Update Comment
      </ButtonSmall>

      <a onClick={onCancel} className="cursor-pointer ml-3 text-sm text-text-secondary">Cancel</a>

      {isSubmitting && <LoadingIcon className="absolute inset-0 z-50" />}
    </div>
  );
}