import { getAllChapterByStoryId } from "@/repositories/chapter-repository";
import { getRatingSummary } from "@/repositories/rating-repository";
import { getStoryDetail } from "@/repositories/story-repository";
import { Chapter } from "@/types/chapter-types";
import { Story } from "@/types/story-type";
import { BookmarkBorder } from "@mui/icons-material";
import { Button, Card, CardActionArea, CardContent, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function PageStoryDetail() {
    const navigate = useNavigate();
    const [story, setStory] = useState<Story>()
    const { storyId } = useParams();
    const [rating, setRating] = useState<{
        count: number,
        average: number,
        userRate: number | null,
    }>({
        count: 0,
        average: 0,
        userRate: null,
    });
    const [chapterList, setChapterList] = useState<Chapter[]>();
    const actions = (
        <>
            <Button variant="contained">Continue reading</Button>
            <Button variant="outlined">Save to bookmark</Button>
        </>
    )

    useEffect(() => {
        if (storyId) {
            getStoryDetail(storyId).then((res) => {
                if (res.ok)
                    res.json().then(setStory);
            })
            getRatingSummary(storyId).then((res) => {
                if (res.ok)
                    res.json().then(setRating);
            })
            getAllChapterByStoryId(storyId).then((res) => {
                if (res.ok)
                    res.json().then(setChapterList);
            })
        }
    }, [])
    return (
        <Container>
            <div className="flex gap-6 mt-2">
                <div>
                    <img src={story?.coverImage} alt="" className="aspect-square w-24 md:w-52 rounded-3xl object-cover" />
                </div>
                <div className="flex flex-col gap-2 self-stretch">
                    <div className="flex-grow">
                        <Typography variant="h4">{story?.title ?? "Loading..."}</Typography>
                        <Typography variant="caption">Last update: 01/01/2024</Typography>
                        <Typography className="line-clamp-3">{story?.description}</Typography>
                    </div>
                    <div className="gap-6 hidden md:flex">
                        {actions}
                    </div>
                    <div className="flex gap-6">
                        <div className="flex gap-2">
                            <Rating value={rating.average / 2} precision={0.1} readOnly />
                            <span>{rating.average / 2}/5</span>
                        </div>
                        <div className="flex gap-2">
                            <BookmarkBorder />
                            <span>3</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gap-6 flex md:hidden mt-4">
                {actions}
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {chapterList?.map((chapter) => (
                    <Card sx={{
                        boxShadow: 'none'
                    }}>
                        <CardActionArea onClick={() => navigate("/read/1")}>
                            <CardContent>
                                <div className="flex flex-col self-stretch">
                                    <Typography variant="h6" className="-mt-1">Chapter {chapter.ChapterNumber}: {chapter.Title}</Typography>
                                    <div className="flex-grow">
                                        {/* <Typography variant="body2" className="line-clamp-2 md:line-clamp-3">{chapter.}</Typography> */}
                                    </div>
                                    <Typography variant="caption">
                                        <span>Today</span> - <span>24 mins</span>
                                    </Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </Container>
    )
}