"use client";

import TextInput from "@/components/form/TextInput";
import DateInput from "@/components/form/DateInput";
import TagInput from "@/components/form/TagInput";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ButtonSmall from "@/components/ButtonSmall";

export default function PostFilter({ initialFilters, className = "" }) {

  const router = useRouter();
  const pathname = usePathname();

  const { title, startDate, endDate, tags } = initialFilters || {};
  
  // Initial form state
  const [filters, setFilters] = useState({
    title: title || "",
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    tags: tags ? tags.split(",") : []
  });

  const handleInput = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filters.title) params.set("title", filters.title);
    if (filters.startDate) params.set("startDate", filters.startDate.toISOString());
    if (filters.endDate) params.set("endDate", filters.endDate.toISOString().split("T")[0]);
    if (filters.tags?.length > 0) params.set("tags", filters.tags.join(","));
    router.push(`${pathname}?${params.toString()}`);
  } 

  return (
    <div className={`${className} bg-bg-front p-6 w-full mb-6 flex-wrap flex flex-row gap-12`}>
      <TextInput
        label="Title"
        name="title"
        value={filters.title}
        onTextChange={handleInput}
        placeholder="Filter by title"
        className="flex-1 min-w-30"
      />

      <DateInput 
        label="From"
        name="startDate"
        selected={filters.startDate}
        onDateChange={(date) => handleInput("startDate", date)}
        isClearable={true}
        className="min-w-30"
        placeholder={"Start date"}
      />

      <DateInput 
        label="To"
        name="endDate"
        selected={filters.endDate}
        onDateChange={(date) => handleInput("endDate", date)}
        isClearable={true}
        className="min-w-30"
        placeholder={"End date"}
      />

      <TagInput
        tags={filters.tags}
        setTags={(newTags) => handleInput("tags", newTags)}
        className="flex-1 min-w-30"
        placeholder={"Filter by tag"}
      />

      <ButtonSmall onClick={applyFilters} className="h-fit mt-3">
        Apply filters
      </ButtonSmall>
    </div>
  );
}