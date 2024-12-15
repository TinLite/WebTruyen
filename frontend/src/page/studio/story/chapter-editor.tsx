import { createChapter, getChapter, updateChapter } from "@/repositories/chapter-repository";
import { Chapter } from "@/types/chapter-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Container, Paper, TextField } from "@mui/material";
import { Bold, ClassicEditor, Essentials, FontBackgroundColor, FontColor, Heading, Italic, List, Markdown, Paragraph } from "ckeditor5";

import 'ckeditor5/ckeditor5.css';
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function PageStudioChapterEdit() {
    const ref = useRef<CKEditor<ClassicEditor>>(null);
    const navigate = useNavigate();
    const { chapterId, storyId } = useParams();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [chapterNumber, setChapterNumber] = useState<string>("");
    const [chapter, setChapter] = useState<Chapter>();

    useEffect(() => {
        if (chapterId) {
            getChapter(chapterId).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        setChapter(data)
                        setTitle(data.Title)
                        setContent(data.Content)
                        setChapterNumber(data.ChapterNumber)
                        if (ref.current && ref.current.editor)
                            ref.current.editor.setData(data.Content)
                    })
                }
            })
        }
    }, [])

    function onDiscard() {
        navigate("../chapter")
    }

    function onSave() {
        if (!ref.current || !ref.current.editor)
            return;
        const editor = ref.current.editor;
        
        // validate and alert
        if (!title) {
            alert("Title is required")
            return
        }
        if (!chapterNumber) {
            alert("Chapter number is required")
            return
        }
        if (isNaN(parseInt(chapterNumber))) {
            alert("Chapter number must be a number")
            return
        }
        // Update chapter
        updateChapter(chapterId!, storyId!, {
            Title: title,
            Content: editor.getData(),
            ChapterNumber: chapterNumber
        }).then((res) => {
            if (res.ok) {
                alert("Update chapter successfully")
                navigate("../chapter")
            }
        })
    }

    return (
        <Container>
            <div
                className="flex mb-4">

                <TextField
                    variant="standard"
                    label="Chapter number"
                    value={chapterNumber}
                    onChange={(e) => setChapterNumber(e.target.value)}
                />
                <TextField
                    variant="standard"
                    label="Chapter title"
                    className="flex-grow"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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

export function PageStudioChapterCreate() {
    const ref = useRef<CKEditor<ClassicEditor>>(null);
    const navigate = useNavigate();
    const { storyId } = useParams();
    const [title, setTitle] = useState<string>("");
    const [chapterNumber, setChapterNumber] = useState<string>("");

    function onDiscard() {
        navigate("../chapter")
    }

    function onSave() {
        if (!ref.current || !ref.current.editor)
            return;
        const editor = ref.current.editor;
        // validate and alert
        if (!title) {
            alert("Title is required")
            return
        }
        if (!chapterNumber) {
            alert("Chapter number is required")
            return
        }
        if (isNaN(parseInt(chapterNumber))) {
            alert("Chapter number must be a number")
            return
        }
        createChapter(storyId!, title, editor.getData(), chapterNumber).then((res) => {
            if (res.ok) {
                alert("Create chapter successfully")
                navigate("../chapter")
            }
        })
    }

    return (
        <Container>
            <div
                className="flex mb-4">

                <TextField
                    variant="standard"
                    label="Chapter number"
                    value={chapterNumber}
                    onChange={(e) => setChapterNumber(e.target.value)}
                />
                <TextField
                    variant="standard"
                    label="Chapter title"
                    className="flex-grow"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                        initialData: 'Your journey begins here...',
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