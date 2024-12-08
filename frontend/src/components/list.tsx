import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export function StoryListItem() {
    const navigate = useNavigate();
    return (
        <Card className="shrink-0" sx={{
            width: 160,
        }}>
            <CardActionArea onClick={() => navigate('/truyen/1')}>
                <CardMedia
                    component='img'
                    image='https://cataas.com/cat?width=160&height=120'
                    alt='random image'
                    height='120'
                    width='160'
                />
                <CardContent>
                    <Typography variant='h6'>Title</Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>Latest chapter</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export function ListCardHorizontal() {

    return (
        <div>
            <Link to={'/'} style={{
                textDecoration: 'none',
                color: 'inherit'
            }}>
                <div className="px-4 py-4 group flex items-center gap-2">
                    <Typography variant='h5'>Title</Typography>
                    <ArrowForwardIcon className="opacity-0 group-hover:opacity-100 -ml-8 group-hover:ml-0 transition-all" />
                    <ArrowForwardIcon className="opacity-100 group-hover:opacity-0 transition-opacity" />
                </div>
            </Link>
            <div className="overflow-x-auto" style={{
                maxWidth: '100vw',
                scrollbarWidth: 'thin',
            }}>
                <div className="flex gap-4 px-4 pb-4">
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
                    <Card className="shrink-0" sx={{
                        width: 160,
                        display: 'grid'
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <ArrowForwardIcon fontSize="large" />
                                <Typography variant='h6'>Xem thêm</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        </div>
    );
}