"use client";

import UserLink from "@/components/UserLink";
import { formatRelative } from 'date-fns'
import capitalise from "@/utils/text.js";
import Image from "next/image";
import { getUserProfilePic, likeComment, hasLiked } from "@/libs/firebase";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import CommentEditor from "@/components/comments/CommentEditor";
import { RiHeartFill, RiHeartLine } from "@remixicon/react";

export default function Comment({ initialData, docId, collectionName }) {
  
  const defaultPhotoUrl =
    "https://firebasestorage.googleapis.com/v0/b/dev-at-deakin-3414c.firebasestorage.app/o/profiles%2F1758514444816.png?alt=media&token=aa0275d8-dba0-485b-8fd1-b8bd42bb0d1c";

  const [imgURL, setImgURL] = useState(defaultPhotoUrl);
  const [editing, setIsEditing] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [data, setData] = useState(initialData)
  const { user } = useContext(UserContext);
  
  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  let displayDate;

  if (data?.lastEditedAt > data?.createdAt) {
    displayDate = "Edited " + formatRelative(data.lastEditedAt, new Date());
  } else if (data) {
    displayDate = capitalise(formatRelative(data?.createdAt, new Date()));
  }

  useEffect(() => {
    const fetchURL = async () => {
      const result = await getUserProfilePic(data.author);
      setImgURL(result);
    }

    const checkLiked = async () => {
      if (user?.uid) {
        const liked = await hasLiked(collectionName, docId, data.id);
        setUserLiked(liked);
      }
    }

    fetchURL();
    checkLiked();
  }, []);

  const onCompleteEdit = (newText) => {
    handleChange("text", newText);
    handleChange("lastEditedAt", new Date());
    setIsEditing(false);
  }

  const onLike = async () => {
    const result = await likeComment(collectionName, docId, data.id);

    if (result == "liked") {
      handleChange("likes", data.likes + 1);
      setUserLiked(true);
    } else {
      handleChange("likes", data.likes - 1);
      setUserLiked(false);
    }
  }

  const onCancelEdit = () => setIsEditing(false);

  return (
    <div className="flex flex-row w-full gap-4 mb-6">
      {/* Image */}
      <div className="relative h-10 w-10 flex-none bg-bg-mid mt-1">
        {imgURL && <Image src={imgURL} fill className="object-cover" alt="User profile image" />}
      </div>
      
      <div className="w-full">
        {/* Data */}
        <div className="flex flex-row items-center">
          <UserLink uid={data.author} className="text-[0.92rem] mr-4"/>
          <p className="text-sm text-text-tertiary">
            {displayDate}
          </p>
        </div>

        {/* Text */}
        {editing ? (
          <CommentEditor
            data={data}
            onComplete={onCompleteEdit}
            onCancel={onCancelEdit}
            docId={docId}
            collectionName={collectionName}
          />
        ) : (
          <p className="text-[0.92rem]">
            {data.text}
          </p>
        )}

        {/* Likes */}
        <div className="flex flex-row items-center gap-2 mt-1">
          {userLiked && !editing ?
            <RiHeartFill onClick={onLike} size={18} className="cursor-pointer text-(--clr-primary)" /> :
            !editing ?
            <RiHeartLine onClick={onLike} size={18} className="cursor-pointer text-text-secondary hover:stroke-2 hover:stroke-(--clr-primary)" />
            : <></>
          }
          {data.likes > 0 && !editing && <div className="text-sml text-text-secondary">{data.likes}</div>}

          {/* Edit prompt */}
          {(user.uid == data.author && !editing) &&
            <a onClick={() => setIsEditing(true)}
              className="text-sm cursor-pointer text-text-tertiary">
                Edit
            </a>}
        </div>
        </div>

    </div>
  );
}