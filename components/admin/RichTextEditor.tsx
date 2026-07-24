'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

function ToolbarButton({ editor, cmd, active, label }: { editor: Editor; cmd: () => void; active: boolean; label: string }) {
  return (
    <button type="button" className={active ? 'on' : ''} onMouseDown={(e) => { e.preventDefault(); cmd(); }}>
      {label}
    </button>
  );
}

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '<p></p>',
    immediatelyRender: false, // required under Next SSR
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // keep external resets (e.g. loading a different post) in sync
  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return <div className="rte"><div className="ProseMirror">Loading editor…</div></div>;

  return (
    <div className="rte">
      <div className="rte-toolbar">
        <ToolbarButton editor={editor} label="B" active={editor.isActive('bold')} cmd={() => editor.chain().focus().toggleBold().run()} />
        <ToolbarButton editor={editor} label="I" active={editor.isActive('italic')} cmd={() => editor.chain().focus().toggleItalic().run()} />
        <ToolbarButton editor={editor} label="H2" active={editor.isActive('heading', { level: 2 })} cmd={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <ToolbarButton editor={editor} label="H3" active={editor.isActive('heading', { level: 3 })} cmd={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
        <ToolbarButton editor={editor} label="• List" active={editor.isActive('bulletList')} cmd={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolbarButton editor={editor} label="1. List" active={editor.isActive('orderedList')} cmd={() => editor.chain().focus().toggleOrderedList().run()} />
        <ToolbarButton editor={editor} label="❝ Quote" active={editor.isActive('blockquote')} cmd={() => editor.chain().focus().toggleBlockquote().run()} />
        <ToolbarButton editor={editor} label="↺" active={false} cmd={() => editor.chain().focus().undo().run()} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
