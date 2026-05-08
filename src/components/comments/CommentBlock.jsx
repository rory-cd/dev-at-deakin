"use client";

import Comment from "@/components/comments/Comment";
import CommentInput from "@/components/comments/CommentInput";
import { useEffect, useState } from "react";
import { getAllComments } from "@/libs/firebase";
import LoadingIcon from "@/components/LoadingIcon";

export default function CommentBlock({ docId, collectionName }) {

  const [isLoading, setIsLoading] = useState(true);
  const [commentData, setCommentData] = useState(null);

  const fetchComments = async () => {
    setIsLoading(true);
    const result = await getAllComments(docId, collectionName)
    setCommentData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (isLoading) return <LoadingIcon />

  return (
    <div className="mt-10 max-w-200">
      <h4 className="`block text-[0.85rem] text-text-secondary font-[500] uppercase tracking-[0.1rem] font-heading mb-3">Comments</h4>
      {(!commentData || commentData.length == 0) ? (
      <p className="text-sm text-text-secondary">No comments have been posted yet. Post the first one!</p>
      ) : (
        commentData.map((c) => <Comment key={c.id} initialData={c} docId={docId} collectionName={collectionName} />)
      )}
      <CommentInput collectionName={collectionName} docId={docId} onPost={fetchComments} />
    </div>
  );
}