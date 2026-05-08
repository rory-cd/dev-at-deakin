'use client'

import { useMemo, useState, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Youtube from '@tiptap/extension-youtube';
import { createLowlight, common } from 'lowlight';
import LoadingIcon from '@/components/LoadingIcon';
import { EditorContent, EditorContext } from '@tiptap/react';
import ToolbarFull from '@/components/tiptap/ToolbarFull';
import { set } from 'zod';

export default function ArticleEditorDisplay({ article, readOnly=false }) {

  const [isReadOnly, setIsReadOnly] = useState(readOnly);

  // Tiptap editor
  const lowlight = createLowlight(common)

  const editor = useEditor({
    editable: !isReadOnly,
    extensions: [
      StarterKit.configure({
        codeBlock: false,         // Disable default
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
    ],
    content: "",                  // Initial content (type html here)
    immediatelyRender: false     // Don't render immediately on the server to avoid SSR issues
});

useEffect(() => {
  if (editor && article?.content) {
    editor.commands.setContent(JSON.parse(article.content));  
  }
}, [article, editor]);

// Memoize the provider value to avoid unnecessary re-renders
const providerValue = useMemo(() => ({ editor }), [editor])

const style = !isReadOnly
? "p-[2px] z-30 w-full bg-bg-mid inset-ring-1 inset-ring-text-tertiary focus-within:inset-ring-2 focus-within:inset-ring-(--clr-primary)"
: "";

if (!editor) return <LoadingIcon />

return (
  <EditorContext.Provider value={providerValue}>
    <div className={style}>
      {!isReadOnly && <ToolbarFull />}
      <EditorContent editor={editor} />
    </div>
  </EditorContext.Provider>
);
}