import { EditorContent, useEditor, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface Props {
    content: JSONContent | Json;
}

export const ProductDescription = ({ content }: Props) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content as JSONContent,
        editable: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base maw-w-none px-4 pb-20 text-slate-700 mx-auto '
            },
        }
    });


    return <div>
        <h2 className="text-2xl font-bold text-center mb-8 underline mt-10 text-slate-800 px-4 py-2">
            Descripción
        </h2>
        <EditorContent editor={editor} >

        </EditorContent>
    </div>
}