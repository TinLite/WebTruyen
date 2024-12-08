import { Container, CssBaseline, Typography } from "@mui/material";
import { StoryListItem } from "../../../components/list";

export function PageStudioStorySelector() {
    return <div>
        <CssBaseline />
        <div className="text-center my-12">
            <Typography variant="h4">Welcome to studio!</Typography>
            <Typography>Select one story to continue, or create a new one</Typography>
        </div>
        <Container>
            <div className="flex gap-6 flex-wrap">
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
                <StoryListItem />
            </div>
        </Container>
    </div>
}