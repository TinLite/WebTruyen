import { createStory } from "@/repositories/story-repository";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Breadcrumbs, Button, Container, Link, TextField, TextFieldProps, Typography } from "@mui/material";
import { Bold, ClassicEditor, Essentials, FontBackgroundColor, FontColor, Heading, Italic, List, Markdown, Paragraph } from "ckeditor5";
import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export function PageStudioStoryNew() {
    const ref = useRef<CKEditor<ClassicEditor>>(null);
    const navigate = useNavigate();

    const inputTheme: TextFieldProps = {
        variant: "filled"
    }
    const [title, setTitle] = useState<string>("");
    return <Container>
        <div className="my-12">
            <Breadcrumbs>
                <Link color="inherit" underline="hover" component={RouterLink} to="/">Homepage</Link>
                <Link color="inherit" underline="hover" component={RouterLink} to="/studio">Creator Studio</Link>
            </Breadcrumbs>
            <Typography variant="h4">Create new story</Typography>
        </div>
        <div className="my-8">
            <div className="flex flex-col gap-2 flex-grow">
                <TextField {...inputTheme} label="Story title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <Typography variant="body1">Description
                </Typography>
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
            </div>
        </div>
        <div className="flex justify-end gap-2">
            {/* @ts-expect-error */}
            <Button variant="outlined" LinkComponent={RouterLink} to="/studio">Cancel</Button>
            <Button variant="contained" onClick={() => {
                if (!ref.current || !ref.current.editor)
                    return;
                const editor = ref.current.editor;
                const data = editor.getData();
                createStory({ title, description: data }).then((res) => {
                    if (res.ok) {
                        alert("Create story successfully");
                        navigate("/studio");
                    }
                })
            }}>Create</Button>
        </div>
    </Container>
}