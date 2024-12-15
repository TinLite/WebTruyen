import { UserContext } from "@/context/user-context";
import { listHighestRatingStory, listNewStory, listUpdatedChapterStory } from "@/repositories/story-repository";
import { Story } from "@/types/story-type";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ListCardHorizontal } from "../components/list";

export default function PageMain() {
    const { user } = useContext(UserContext)
    const [newlyCreatedStories, setNewlyCreatedStories] = useState<Story[]>([]);
    const [newUpdatedStories, setNewUpdatedStories] = useState<Story[]>([]);
    const [highRate, setHighRate] = useState<Story[]>([]);

    useEffect(() => {
        listNewStory().then(
            (res) => {
                if (res.ok) {
                    res.json().then(setNewlyCreatedStories);
                }
            }
        )
        listUpdatedChapterStory().then(
            (res) => {
                if (res.ok)
                    res.json().then(setNewUpdatedStories)
            }
        )
        listHighestRatingStory().then(
            (res) => {
                if (res.ok)
                    res.json().then(setHighRate);
            }
        )
    }, [])

    return (
        <div>
            <div className="flex">
                <Typography variant="h4" noWrap component="div" sx={{
                    px: '1rem',
                    flexGrow: '1',
                    pb: '2rem',
                }}>
                    {user ? `Welcome back, ${user.displayname ?? user.username}` : 'Pick your story'}
                </Typography>
            </div>
            <ListCardHorizontal title="Truyện mới" storyList={newlyCreatedStories} />
            <ListCardHorizontal title="Vừa cập nhật tập mới" storyList={newUpdatedStories} />
            <ListCardHorizontal title="Cộng đồng yêu thích" storyList={highRate} />
        </div>
    );
}