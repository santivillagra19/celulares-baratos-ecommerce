import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatListBulleted,
  MdFormatListNumbered,
} from 'react-icons/md'

export const TiptapEditor = ({ value, onChange }: { value: JSONContent | string, onChange: (val: JSONContent) => void }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[200px] max-w-none p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON())
        },
    })

    if (!editor) {
        return null
    }

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all bg-white shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1 flex-wrap">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                    <MdFormatBold size={20} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                    <MdFormatItalic size={20} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                    <MdFormatStrikethrough size={20} />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2 self-center" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                    <MdFormatListBulleted size={20} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                    <MdFormatListNumbered size={20} />
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}
