"use client";

import { RiDeleteBin6Line } from "@remixicon/react";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import UserLink from "@/components/UserLink";

export default function QuestionCard({ data, allowDelete=true, className = ""}) {

  const [hidden, setHidden] = useState(false);
  const router = useRouter();
  const { hideQuestion } = useContext(UserContext);

  const handleHideQuestion = (e) => {
    e.stopPropagation();     // Ensure click doesn't propogate to the element below
    hideQuestion(data.id);   // Add this question to the user's doc
    setHidden(true);
  }

  const truncatedText = (text) => {
    if (text.length > 115) {
      return text.substring(0, 115) + "...";
    }
    return text;
  }

  if (hidden) return null;

  return (
    <div onClick={() => router.push(`/questions/${data.id}`)} className={`${className} flex group relative h-full flex-col border-t-3 border-(--clr-secondary) p-5 bg-bg-front-50`}>
      
      {/* Title */}
      <h3 className="mb-1 font-sans text-[1.2rem] font-bold">{data.title}</h3>

      {/* Description */}
      <p className="mb-4 text-text-secondary">{truncatedText(data.description)}</p>

      {/* Rating and Author */}
      <div className="mt-auto flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Asked by <UserLink uid={data.author} />
        </p>
      </div>

      {/* Hide question button */}
      {allowDelete && 
        <button 
          className="hidden group-hover:block group-hover:absolute bottom-4 right-4 cursor-pointer"
          onClick={(e) => handleHideQuestion(e)}
        >
          <RiDeleteBin6Line size={18} className="text-text-tertiary hover:text-red-800" />
        </button>
      }
    </div>
  );
}
