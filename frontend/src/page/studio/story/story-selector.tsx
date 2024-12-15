import { getStoriesCreatedByMe } from "@/repositories/story-repository";
import { Story } from "@/types/story-type";
import { Card, CardActionArea, CardContent, CardMedia, Container, CssBaseline, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoryListItem } from "../../../components/list";

export function PageStudioStorySelector() {
    const [stories, setStories] = useState<Story[]>([]);
    useEffect(() => {
        getStoriesCreatedByMe().then(
            (res) => {
                if (res.ok) {
                    res.json().then(setStories);
                }
            }
        )
    }, [])
    return (
        <div>
            <CssBaseline />
            <div className="text-center my-12">
                <Typography variant="h4">Welcome to studio!</Typography>
                <Typography>Select one story to continue, or create a new one</Typography>
            </div>
            <Container>
                <div className="flex gap-6 flex-wrap">
                    <Card>
                        {/* @ts-expect-error */}
                        <CardActionArea LinkComponent={Link} to="new" sx={{
                            height: "100%"
                        }}>
                            <div className="h-full">
                                <CardMedia
                                    component='img'
                                    image='/unseen-studio-s9CC2SKySJM-unsplash.jpg'
                                    alt='random image'
                                    height='120'
                                    width='160'
                                />
                                <CardContent>
                                    Create new story...
                                </CardContent>
                            </div>
                        </CardActionArea>
                    </Card>
                    {stories.map((story) => (
                        <StoryListItem title={story.title} imageUrl={story.coverImage} key={story._id} url={story._id} />
                    ))}
                </div>
            </Container>
        </div>
    )
}