import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CloudUpload } from "@mui/icons-material";
import { Button, Container, Paper, styled, TextField, Typography } from "@mui/material";
import { Bold, ClassicEditor, Essentials, FontBackgroundColor, FontColor, Heading, Italic, List, Markdown, Paragraph } from "ckeditor5";
import 'ckeditor5/ckeditor5.css';
import { useRef } from "react";

export function PageStudioStoryDetail() {
    const ref = useRef<CKEditor<ClassicEditor>>(null);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Container>
            <div></div>
            <TextField label="Story title" variant="standard" className="w-full mb-4" />
            <Typography variant="body1">Description
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
            </Typography>
            <Typography>Cover image</Typography>
            <div className="grid grid-cols-2">
                <div>
                    <Typography variant="caption">
                        Current cover
                        <img src="https://cataas.com/cat" className="aspect-video object-contain w-full" />
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption">
                        New cover
                        <img src="https://cataas.com/cat" className="aspect-video object-contain w-full" />
                    </Typography>
                    <div className="text-center">
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUpload />}
                            size="small"
                        >
                            Select file
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
                    </div>
                </div>
            </div>
            <Paper elevation={0} className="flex justify-end rounded-none py-2 sticky bottom-0">
                <Button variant="contained">Save</Button>
            </Paper>
        </Container>
    )
}