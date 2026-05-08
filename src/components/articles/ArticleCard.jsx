"use client";

import Image from "next/image";
import StarRating from "@/components/StarRating";
import UserLink from "@/components/UserLink";
import { useRouter } from "next/navigation";

export default function Card({ data, className = "" }) {

  const router = useRouter();
   
  const truncatedText = (text) => {
    if (text.length > 115) {
      return text.substring(0, 115) + "...";
    }
    return text;
  }

  return (
    <div onClick={() => router.push(`/articles/${data.id}`)} className={`flex h-full flex-col ${className} p-5 bg-bg-front-50`}>
      {/* 3:2 Image */}
      <div className="relative border-b-3 border-(--clr-primary) mb-3 aspect-[3/2] w-full">
        <Image
          src={data.imgUrl}
          alt={data.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Title */}
      <h3 className="mb-1 font-heading uppercase text-[1.2rem] tracking-[0.05rem] font-[400]">{data.title}</h3>

      {/* Description */}
      <p className="mb-4 text-text-secondary">{truncatedText(data.abstract)}</p>

      {/* Rating and Author */}
      <div className="mt-auto flex items-center justify-between">
        <StarRating rating={data.rating} articleId={data.id} />
        <p className="text-sm text-text-secondary">by <UserLink uid={data.author} /></p>
      </div>
    </div>
  );
}
