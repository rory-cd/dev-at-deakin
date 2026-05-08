import { useEditorState, useCurrentEditor } from '@tiptap/react';
import { headingOptions, languageOptions, toolbarButtons } from '@/components/tiptap/ToolbarConfig'
import { RiArrowDropDownLine } from '@remixicon/react'
import DropDown from '@/components/DropDown'
import Divider from '@/components/tiptap/Divider'
import ToolbarButton from '@/components/tiptap/ToolbarButton';

export default function ToolbarFull () {
  const {editor} = useCurrentEditor();

  // EDITOR STATE
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor?.isActive('bold') ?? false,
        isItalic: ctx.editor?.isActive('italic') ?? false,
        isStrike: ctx.editor?.isActive('strike') ?? false,
        isCode: ctx.editor?.isActive('code') ?? false,
        isParagraph: ctx.editor?.isActive('paragraph') ?? false,
        isHeading1: ctx.editor?.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor?.isActive('heading', { level: 4 }) ?? false,
        isBulletList: ctx.editor?.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor?.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor?.isActive('blockquote') ?? false,
        currentLang: ctx.editor?.getAttributes('codeBlock')?.language || 'auto',
      }
    },
  })

  // const currentLang = editor?.getAttributes('codeBlock')?.language || 'auto';

  const languages = {
    'c': 'C',
    'cpp': 'C++',
    'csharp': 'C#',
    'python': 'Python',
    'javascript': 'JavaScript',
    'css': 'CSS',
    'html': 'HTML'
  }
  
  return (
    <div className="tt-toolbar">

      {/* HEADING */}
      <DropDown className="w-33" options={headingOptions(editor, editorState)}>
        {
          editorState.isHeading1 ? "Heading 1" :
          editorState.isHeading2 ? "Heading 2" :
          editorState.isHeading3 ? "Heading 3" :
          editorState.isHeading4 ? "Heading 4" : "Paragraph"
        }
        <RiArrowDropDownLine />
      </DropDown>

      {/* TOOLS */}
      {toolbarButtons(editor, editorState)
        .filter(btn => ["bold", "italic", "strike", "youTube"].includes(btn.key))
        .map(btn => (
        <ToolbarButton 
          key={btn.key} 
          Icon={btn.Icon} 
          isActive={btn.isActive} 
          onClick={btn.onClick} 
        />
      ))}

      <Divider />

      {toolbarButtons(editor, editorState)
        .filter(btn => ["bulletList", "orderedList", "blockquote"].includes(btn.key))
        .map(btn => (
        <ToolbarButton 
          key={btn.key} 
          Icon={btn.Icon} 
          isActive={btn.isActive} 
          onClick={btn.onClick} 
        />
      ))}

      <Divider />

      {toolbarButtons(editor, editorState)
        .filter(btn => ["code", "codeBlock"].includes(btn.key))
        .map(btn => (
        <ToolbarButton 
          key={btn.key} 
          Icon={btn.Icon} 
          isActive={btn.isActive} 
          onClick={btn.onClick} 
        />
      ))}

      <DropDown className="w-33" options={languageOptions(editor, editorState.currentLang)}>
        {languages[editorState.currentLang] || "Select\u00A0language"}
        <RiArrowDropDownLine />
      </DropDown>
    </div>
  )
}