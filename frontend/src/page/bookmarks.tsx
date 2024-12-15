import { ListStoryCol } from "@/components/list";
import { listBookmarkedStory } from "@/repositories/bookmark-repository";
import { Story } from "@/types/story-type";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PageBookmarked() {
    const [bookmarks, setBookmarks] = useState<Story[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        listBookmarkedStory().then(
            (res) => {
                if (res.ok) {
                    res.json().then(setBookmarks);
                }
            }
        )
    }, [])

    return <Container>
        <div className="flex">
            <Typography variant="h4" noWrap component="div" sx={{
                px: '1rem',
                flexGrow: '1',
                pb: '2rem',
            }}>
                Followed stories
            </Typography>
        </div>
        <ListStoryCol storyList={bookmarks} />
    </Container>
}