import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Container, Paper, TextField } from "@mui/material";
import { Bold, ClassicEditor, Essentials, FontBackgroundColor, FontColor, Heading, Italic, List, Markdown, Paragraph } from "ckeditor5";

import 'ckeditor5/ckeditor5.css';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function PageStudioChapterEdit() {
    const ref = useRef<CKEditor<ClassicEditor>>(null);
    const navigate = useNavigate();
    function onDiscard() {
        navigate("../chapter")
    }

    function onSave() {
        if (!ref.current || !ref.current.editor)
            return;
        const editor = ref.current.editor;
        console.log(editor.getData())
    }

    return (
        <Container>
            <div
                className="flex mb-4">

                <TextField
                    variant="standard"
                    label="Chapter number"
                />
                <TextField
                    variant="standard"
                    label="Chapter title"
                    className="flex-grow"
                />
            </div>
            <div className="text-black">
                <CKEditor
                    ref={ref}
                    editor={ClassicEditor}
                    config={{
                        licenseKey: 'GPL',
                        plugins: [Essentials, Paragraph, Bold, Italic, FontColor, FontBackgroundColor, Heading, Markdown, List],
                        toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList'],
                        fontColor: {
                            colors: ['black']
                        },
                        initialData: '**Hello from CKEditor 5 in React!**',
                    }}
                />
            </div>
            <Paper className="flex gap-2 justify-end sticky bottom-0 py-4 rounded-none" elevation={0}>
                <Button variant="outlined" onClick={onDiscard}>Discard</Button>
                <Button variant="contained" onClick={onSave}>Save</Button>
            </Paper>
        </Container>
    )
}