"use client";

import { RiStarFill, RiStarHalfFill, RiStarLine } from "@remixicon/react";
import { rateArticle, getUserRating } from "@/libs/firebase";
import { useEffect, useState } from "react";

export default function StarRating({ rating = null, clickable = false, className = "", articleId, ratingCount }) {

  const stars = [];
  const [userRating, setUserRating] = useState(0);
  const [currentCount, setCurrentCount] = useState(ratingCount || 0);
  const [val, setVal] = useState(Math.round(rating * 2) / 2);

  useEffect(() => {
    const checkPriorRatings = async () => {
      const oldRating = await getUserRating(articleId);
      setUserRating(oldRating);
    }
    checkPriorRatings();
  }, [articleId]);

  // User clicks a star
  const handleRate = async (e, newRating) => {
    e.stopPropagation();
    if (!clickable) return;

    setUserRating(newRating);
    const { newAvg, newCount } = await rateArticle(articleId, newRating);

    setVal(Math.round(newAvg * 2) / 2);
    setCurrentCount(newCount);
  };

  const highlightStyle = (i) => i < userRating ? "stroke-2 stroke-(--clr-primary)" : "";
  const brightStyle = `${clickable && "cursor-pointer group-hover:opacity-50 hover:opacity-100"} text-yellow-400`;
  const dullStyle = `${clickable && "cursor-pointer group-hover:opacity-50 hover:opacity-100"} text-text-tertiary`;

  for (let i = 0; i < 5; i++) {

    if (val - i >= 1) {
      stars.push(<RiStarFill key={i} onClick={(e) => handleRate(e, i + 1)} size="18" className={`${brightStyle} ${highlightStyle(i)}`} />);
    }
    else if (val - i > 0) {
      stars.push(<RiStarHalfFill key={i} onClick={(e) => handleRate(e, i + 1)} size="18" className={`${brightStyle} ${highlightStyle(i)}`} />);
    }
    else {
      stars.push(<RiStarLine key={i} onClick={(e) => handleRate(e, i + 1)} size="18" className={`${dullStyle} ${highlightStyle(i)}`} />);
    }
  }

  return (
    <div className={`flex gap-0.75 group items-center ${className}`}>
      {stars}
      {currentCount > 0 && <span className="ml-1 text-sm">{currentCount} rating{currentCount != 1 && "s"}</span>}
    </div>
  );
}