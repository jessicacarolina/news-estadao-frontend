import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Undo2, Redo2 } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [ StarterKit, TextStyle ],
    content: value || '<p></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p></p>', false);
    }
  }, [value]);

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'text-blue-600' : ''}
          title="Negrito"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'text-blue-600' : ''}
          title="Itálico"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'text-blue-600' : ''}
          title="Lista com marcadores"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'text-blue-600' : ''}
          title="Lista numerada"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          title="Desfazer"
        >
          <Undo2 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          title="Refazer"
        >
          <Redo2 size={16} />
        </button>
      </div>

      <div
        className="min-h-[300px] w-full p-4 border border-gray-300 rounded-lg focus-within:outline-none prose max-w-none"
      >
        <EditorContent editor={editor} className="w-full min-h-[300px] cursor-text focus:outline-none" />
      </div>
    </div>
  );
}
