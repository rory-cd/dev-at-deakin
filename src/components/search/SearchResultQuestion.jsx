"use client";

import UserLink from "@/components/UserLink";
import { useRouter } from "next/navigation";

export default function SearchResultQuestion({ data }) {

  const router = useRouter();

  const truncatedText = (text) => {
  if (text?.length > 100) {
      return text.substring(0, 100) + "...";
    }
    return text;
  }

  return (
    <div onClick={() => router.push(`/questions/${data.id}`)} className="flex flex-row cursor-pointer p-8 h-full border-t-3 border-(--clr-secondary) bg-bg-front-50">
      <div className="flex flex-col w-80">
        {/* Title and author*/}
        <h3 className="font-heading uppercase text-[1.2rem] tracking-[0.05rem] font-[400] mr-4">
          {data.title}
        </h3>
        <p className="text-sm mt-2 text-text-secondary">
          by <UserLink uid={data.author} />
        </p>
      </div>

      {/* Description */}
      <p className="text-text-secondary">{truncatedText(data.description)}</p>
    </div>
  );
}