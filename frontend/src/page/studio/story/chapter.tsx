import { deleteChapter, getAllChapterByStoryId } from "@/repositories/chapter-repository";
import { Chapter } from "@/types/chapter-types";
import { Button, ButtonGroup, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function PageStudioChapterSelector() {
    const navigate = useNavigate();
    const [chapterList, setChapterList] = useState<Chapter[]>();
    const { storyId } = useParams();

    function fetchData() {
        getAllChapterByStoryId(storyId!).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setChapterList(data)
                })
            } else {
                console.error("Failed to fetch chapter list")
                navigate("/studio")
            }
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    function handleModifyButtonClick(id: string | number) {
        navigate(`${id}`)

    }

    function handleDeleteButtonClick(chapterId: string | number) {
        chapterId = chapterId.toString();
        deleteChapter(chapterId, storyId!).then((res) => {
            if (res.ok) {
                fetchData();
            }
        })
    }
    return (
        <Container>
            <div className="flex mb-4">
                <Typography variant="h6" className="flex-grow">Chapter list</Typography>
                <Button variant="contained" size="small" onClick={() => navigate("new")}>New chapter...</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Reads</TableCell>
                            <TableCell>Creation date</TableCell>
                            <TableCell>Last update</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {chapterList?.map((chapter) => (
                            <TableRow
                                hover
                                key={chapter._id}
                            >
                                <TableCell>{chapter._id}</TableCell>
                                <TableCell>{chapter.Title}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>{chapter.CreateAt?.toDateString()}</TableCell>
                                <TableCell>{chapter.CreateAt?.toDateString()}</TableCell>
                                <TableCell>
                                    <ButtonGroup variant="contained">
                                        <Button onClick={(e) => {
                                            e.preventDefault();
                                            handleModifyButtonClick(chapter._id);
                                        }}>Modify</Button>
                                        <Button color="error" 
                                        onClick={(e) => {
                                            handleDeleteButtonClick(chapter._id);
                                        }}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                        {
                            chapterList?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Typography variant="body2" align="center">No chapter found</Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}