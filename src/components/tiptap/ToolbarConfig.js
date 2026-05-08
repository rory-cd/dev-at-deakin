import { RiBold, RiItalic, RiStrikethrough, RiCodeLine, RiListUnordered, RiListOrdered, RiCodeBlock, RiDoubleQuotesR, RiYoutubeFill } from '@remixicon/react'

export const headingOptions = (editor, state) => [
  {
    "key": 0,
    "value": <span>Paragraph</span>,
    "active": state.isParagraph,
    "onClick": () => editor.chain().focus().setParagraph().run()
  },
  {
    "key": 1,
    "value": <span className="text-[1.5rem] font-bold">Heading&nbsp;1</span>,
    "active": state.isHeading1,
    "onClick": () => editor.chain().focus().toggleHeading({ level: 1 }).run()
  },
  {
    "key": 2,
    "value": <span className="text-[1.4rem]">Heading&nbsp;2</span>,
    "active": state.isHeading2,
    "onClick": () => editor.chain().focus().toggleHeading({ level: 2 }).run()
  },
  {
    "key": 3,
    "value": <span className="text-[1.2rem] font-bold">Heading&nbsp;3</span>,
    "active": state.isHeading3,
    "onClick": () => editor.chain().focus().toggleHeading({ level: 3 }).run()
  },
  {
    "key": 4,
    "value": <span className="uppercase">Heading&nbsp;4</span>,
    "active": state.isHeading4,
    "onClick": () => editor.chain().focus().toggleHeading({ level: 4 }).run()
  }
];

export const toolbarButtons = (editor, state) => [
  {
    key: 'bold',
    Icon: RiBold,
    isActive: state.isBold,
    onClick: () => editor.chain().focus().toggleBold().run()
  },
  {
    key: 'italic',
    Icon: RiItalic,
    isActive: state.isItalic,
    onClick: () => editor.chain().focus().toggleItalic().run()
  },
  {
    key: 'strike',
    Icon: RiStrikethrough,
    isActive: state.isStrike,
    onClick: () => editor.chain().focus().toggleStrike().run()
  },
  {
    key: 'code',
    Icon: RiCodeLine,
    isActive: state.isCode,
    onClick: () => editor.chain().focus().toggleCode().run()
  },
  {
    key: 'bulletList',
    Icon: RiListUnordered,
    isActive: state.isBulletList,
    onClick: () => editor.chain().focus().toggleBulletList().run()
  },
  {
    key: 'orderedList',
    Icon: RiListOrdered,
    isActive: state.isOrderedList,
    onClick: () => editor.chain().focus().toggleOrderedList().run()
  },
  {
    key: 'blockquote',
    Icon: RiDoubleQuotesR,
    isActive: state.isBlockquote,
    onClick: () => editor.chain().focus().toggleBlockquote().run()
  },
  {
    key: 'codeBlock',
    Icon: RiCodeBlock,
    isActive: state.isCodeBlock,
    onClick: () => editor.chain().focus().toggleCodeBlock().run()
  },
  {
    key: 'youTube',
    Icon: RiYoutubeFill,
    isActive: false,
    onClick: () => {
      const url = prompt('Enter YouTube URL')
    
      if (url) {
        editor.commands.setYoutubeVideo({
          src: url,
          width: 640,
          height: 480
        })
      }
    }
  }
];

export const languageOptions = (editor, lang) => [
  {
    "key": "cpp",
    "value": <span>C++</span>,
    "active": lang == "cpp",
    "onClick": () => editor.chain().focus().setNode('codeBlock', { language: "cpp" }).run()
  },
  {
    "key": "csharp",
    "value": <span>C#</span>,
    "active": lang == "csharp",
    "onClick": () => editor.chain().focus().setNode('codeBlock', { language: "csharp" }).run()
  },
  {
    "key": "python",
    "value": <span>Python</span>,
    "active": lang == "python",
    "onClick": () => editor.chain().focus().setNode('codeBlock', { language: "python" }).run()
  },
  {
    "key": "javascript",
    "value": <span>Javascript</span>,
    "active": lang == "javascript",
    "onClick": () => editor.chain().focus().setNode('codeBlock', { language: "javascript" }).run()
  },
  {
    "key": "css",
    "value": <span>CSS</span>,
    "active": lang == "css",
    "onClick": () => editor.chain().focus().setNode('codeBlock', { language: "css" }).run()
  },
  {
    "key": "html",
    "value": <span>HTML</span>,
    "active": lang == "html",
    "onClick": () => editor.chain().focus().setNode('codeBlock', { language: "html" }).run()
  }
];