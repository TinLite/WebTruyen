import { UserContext } from "@/context/user-context";
import { getChapter } from "@/repositories/chapter-repository";
import { createHistory } from "@/repositories/history-repository";
import { Chapter } from "@/types/chapter-types";
import { ThumbUpOffAlt } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Container, Divider, IconButton, Link, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

function SectionComment() {

    function Comment({ username, body, likes = "0", isLiked = false, onLikeAction = () => { } }: { username: string, body: string, likes?: string, isLiked?: boolean, onLikeAction?: () => void }) {
        return (
            <div className="flex">
                <div>
                    <Typography variant="body1">{username}</Typography>
                    <Typography variant="body2">{body}</Typography>
                </div>
                <div className="flex flex-col items-center">
                    <IconButton>
                        {
                            isLiked ?
                                <ThumbUpOffAlt /> :
                                <ThumbUpOffAlt />
                        }
                    </IconButton>
                    <Typography variant="caption">{likes}</Typography>
                </div>
            </div>
        )
    }



    return (
        <Accordion className="my-8">
            <AccordionSummary>Bình luận (95)</AccordionSummary>
            <AccordionDetails>
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
            </AccordionDetails>
        </Accordion>
    )
}

export function PageReader() {

    const [chapter, setChapter] = useState<Chapter>();
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        getChapter(chapterId ?? "").then((res) => {
            if (res.ok) {
                res.json().then(setChapter);

            }

            else
                navigate("/404");
        });
    }, [])

    useEffect(() => {
        if (user && chapter && chapterId) {
            createHistory(
                // @ts-expect-error
                chapter?.StoryId,
                chapterId ?? "",
            ).then((res) => {
                console.log(res)
                if (!res.ok) {
                    console.log(res)
                    console.error("Failed to create history");
                }
            })
        }
    }, [chapter, user, chapterId])

    return (
        <Container maxWidth="sm">
            <div>
                <Link component={RouterLink} to={`/truyen/${chapter?.StoryId}`} className="decoration-transparent text-inherit">
                    Quay lại
                </Link>
                <Typography variant="h4">Chapter {chapter?.ChapterNumber}</Typography>
                <Typography variant="h5">{chapter?.Title}</Typography>
            </div>
            <Divider className="my-4" />
            <div>
                <Markdown>{chapter?.Content}</Markdown>
            </div>
            {/* <Grid2 container className="mt-4">
                <Grid2 size={6}>
                    <Card sx={{
                        borderRadius: "0px"
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="caption" color="textSecondary">
                                    Tập trước
                                </Typography>
                                <Typography variant="h5">
                                    Tập 0
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>
                <Grid2 size={6}>
                    <Card sx={{
                        borderRadius: "0px"
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="caption" color="textSecondary">
                                    Tập sau
                                </Typography>
                                <Typography variant="h5">
                                    Tập 2
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>
            </Grid2> */}
            <SectionComment />
        </Container>
    )
}