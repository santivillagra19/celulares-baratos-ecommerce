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
                class: 'prose prose-sm sm:prose-base maw-w-none '
            },
        }
    });


    return <div>
        <h2 className="text-2xl font-bold text-center mb-8 underline mt-10">
            Descripción
        </h2>
        <EditorContent editor={editor} >

        </EditorContent>
    </div>
}