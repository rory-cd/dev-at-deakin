import Image from "next/image";
import Rating from "@/components/Rating";

export default function Card({ data, className = "" }) {
  return (
    <div className={`flex h-full flex-col ${className} p-5 bg-(--clr-bg-light-50)`}>
      {/* 3:2 Image */}
      <div className="relative border-b-3 border-(--clr-primary) mb-3 aspect-[3/2] w-full">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Title */}
      <h3 className="mb-1 font-heading uppercase text-[1.2rem] tracking-[0.05rem] font-[400]">{data.title}</h3>

      {/* Description */}
      <p className="mb-4 text-(--clr-text-light)">{data.description}</p>

      {/* Rating and Author */}
      <div className="mt-auto flex items-center justify-between">
        <Rating rating={data.rating} />
        <p className="text-sm text-(--clr-text-light)">{`by ${data.author}`}</p>
      </div>
    </div>
  );
}
