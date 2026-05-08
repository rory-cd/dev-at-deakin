"use client";

import Image from "next/image";
import StarRating from "@/components/StarRating";
import UserLink from "@/components/UserLink";
import { useRouter } from "next/navigation";

export default function SearchResultArticle({ data }) {

  const router = useRouter();

  const truncatedText = (text) => {
  if (text?.length > 300) {
      return text.substring(0, 300) + "...";
    }
    return text;
  }

  return (
    <div onClick={() => router.push(`/articles/${data.id}`)} className="cursor-pointer grid grid-cols-[40%_60%] sm:grid-cols-[25%_75%] lg:grid-cols-[15%_35%_45%] xl:grid-cols-[15%_20%_55%] 2xl:grid-cols-[10%_25%_65%] gap-3 py-8 h-full">
      <div className="relative h-30 w-30 flex-none bg-bg-mid mr-5">
        <Image src={data.imgUrl} fill className="object-cover" alt="Article image" />
      </div>
      <div className="flex flex-col">
        <h3 className="mb-1 mt-3 font-heading uppercase text-[1.2rem] tracking-[0.05rem] font-[400]">{data.title}</h3>

        {/* Rating and Author */}
        <p className="text-sm text-text-secondary">by <UserLink uid={data.author} /></p>
        <StarRating rating={data.rating} articleId={data.id} className="mt-4" />
      </div>

      {/* Description */}
      <p className="mb-4 mt-3 text-text-secondary col-span-2 lg:col-span-1">{truncatedText(data.abstract)}</p>
    </div>
  );
}