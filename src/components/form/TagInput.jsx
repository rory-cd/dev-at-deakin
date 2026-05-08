"use client";

import { useState } from 'react';
import TagPill from '@/components/TagPill';
import TextInput from '@/components/form/TextInput';

export default function TagInput({ tags = [], setTags, className = "", placeholder }) {
  const [input, setInput] = useState("");

  // Add tag
  const addTag = (value) => {
    if (!value || tags.includes(value)) return;  // Null/duplicate check
    const newTags = [...tags, value];            // New array with new tag added
    setTags(newTags);                            // Add to parent
    setInput("");                                // Reset tag input
  };

  // Remove tag
  const removeTag = (value) => {
    const newTags = tags.filter(tag => tag !== value);  // New array with tag removed
    setTags(newTags);
  };

  // Automatically adds tags as input is entered
  const handleInput = (name, value) => {
    const commaIndex = value.indexOf(",");
    if (commaIndex !== -1) {                    // Comma entered
      const tag = value.slice(0, commaIndex);   // Get everything before the comma
      addTag(tag);
    } else {
      // No commas, update input as usual
      setInput(value);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <TextInput 
        label="Tags"
        name="tags"
        value={input}
        onTextChange={handleInput}
        onFieldKeyDown={key => key === 'Enter' && addTag(input)}
        placeholder={placeholder}
      />
      
      {/* Show tags if any are applied (used display here to avoid flex gap issues) */}
      <div className={`${tags.length > 0 ? "block" : "hidden"} flex flex-row flex-wrap gap-3`}>
        {tags.map((tag) =>
          <TagPill key={tag} name={tag} onRemove={removeTag} />
        )}
      </div>
    </div>
  );
}