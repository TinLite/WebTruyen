import { UserContext } from "@/context/user-context";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { ListCardHorizontal } from "../components/list";

export default function PageMain() {
    const {user} = useContext(UserContext)
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
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
            <ListCardHorizontal />
        </div>
    );
}