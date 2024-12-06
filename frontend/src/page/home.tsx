import {Typography} from "@mui/material";
import { ListCardHorizontal } from "../components/list";

export default function PageMain() {
    return (
        <div>
            <div className="flex">
                <Typography variant="h4" noWrap component="div" sx={{
                    px: '1rem',
                    flexGrow: '1',
                    pb: '2rem',
                }}>
                    Welcome back, Tiến
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