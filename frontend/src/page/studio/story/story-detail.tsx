import { getStoryDetail, updateStory, updateStoryCover } from "@/repositories/story-repository";
import { Story } from "@/types/story-type";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CloudUpload } from "@mui/icons-material";
import { Button, Container, Paper, styled, TextField, Typography } from "@mui/material";
import { Bold, ClassicEditor, Essentials, FontBackgroundColor, FontColor, Heading, Italic, List, Markdown, Paragraph } from "ckeditor5";
import 'ckeditor5/ckeditor5.css';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export function PageStudioStoryDetail() {
    const ref = useRef<CKEditor<ClassicEditor>>(null);
    const [title, setTitle] = useState<string>("");
    const { storyId } = useParams();
    const [newCover, setNewCover] = useState<File>();

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

    const [story, setStory] = useState<Story>()

    function fetchStory() {
        if (storyId) {
            // Fetch story detail
            getStoryDetail(storyId).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        setStory(data)
                        setTitle(data.title)
                        if (ref.current && ref.current.editor)
                            ref.current.editor.setData(data.description)
                    })
                }
            })
        }
    }

    useEffect(() => {
        fetchStory();
    }, [])

    function onSubmitEvent() {
        if (!ref.current || !ref.current.editor)
            return;
        const editor = ref.current.editor;
        const data = editor.getData();
        // Update story
        updateStory(storyId!, { title, description: data }).then((res) => {
            if (res.ok) {
                alert("Update story successfully");
            }
        })
    }

    function onCoverSubmitEvent() {
        if (!newCover)
            return;

        updateStoryCover(storyId!, newCover).then((res) => {
            if (res.ok) {
                alert("Update cover successfully");
                setNewCover(undefined);
                fetchStory();
            }
        });
    }

    return (
        <Container>
            <div>

                <TextField
                    label="Story title"
                    variant="standard"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    className="w-full mb-4"
                />
                <Typography variant="body1">
                    Description
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
                <Paper elevation={0} className="flex justify-end rounded-none py-2 sticky bottom-0">
                    <Button variant="contained" onClick={onSubmitEvent}>Save</Button>
                </Paper>
            </div>
            <Typography>Cover image</Typography>
            <div className="grid grid-cols-2">
                <div>
                    <Typography variant="caption">
                        Current cover
                        <img src={story?.coverImage} className="aspect-video object-contain w-full" />
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption">
                        New cover
                        <img src={(newCover ? URL.createObjectURL(newCover) : "")} className="aspect-video object-contain w-full" />
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
                                onChange={(event) => {
                                    if (event.target.files) {
                                        setNewCover(event.target.files[0])
                                    }
                                }}
                            />
                        </Button>
                    </div>
                    <Paper elevation={0} className="flex justify-end rounded-none py-2 sticky bottom-0">
                        <Button variant="contained" onClick={onCoverSubmitEvent}>Update new cover</Button>
                    </Paper>
                </div>
            </div>
        </Container>
    )
}