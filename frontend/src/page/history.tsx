import { ListStoryCol } from "@/components/list";
import { listHistory } from "@/repositories/history-repository";
import { Story } from "@/types/story-type";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function PageReadHistory() {
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
        listHistory().then(
            (res) => {
                if (res.ok) {
                    res.json().then(setStories);
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
                Reading history
            </Typography>
        </div>
        <ListStoryCol storyList={stories} />
    </Container>
}