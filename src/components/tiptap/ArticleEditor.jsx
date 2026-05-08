'use client'
import { useMemo } from 'react';
import { EditorContent, EditorContext } from '@tiptap/react';
import ToolbarFull from '@/components/tiptap/ToolbarFull';

export default function ArticleEditor({ editor, isReadOnly=false }) {
  
  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor])

  const style = isReadOnly
    ? ""
    : "p-[2px] z-30 w-full bg-bg-mid inset-ring-1 inset-ring-text-tertiary focus-within:inset-ring-2 focus-within:inset-ring-(--clr-primary)";

  return (
    <EditorContext.Provider value={providerValue}>
      <div className={style}>
        {!isReadOnly && <ToolbarFull />}
        <EditorContent editor={editor} />
      </div>
    </EditorContext.Provider>
  );
}