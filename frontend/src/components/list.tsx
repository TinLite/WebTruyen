import { Story } from '@/types/story-type';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Markdown from 'react-markdown';
import { Link, useNavigate } from "react-router-dom";

export function StoryListItem({ title = "", imageUrl = "", url = "", substitle = "" }: { title?: string, imageUrl?: string, url?: string, substitle?: string }) {
    return (
        <Card className="shrink-0" sx={{
            width: 160,
        }}>
            {/* @ts-expect-error */}
            <CardActionArea LinkComponent={Link} to={url}>
                <CardMedia
                    component='img'
                    image={imageUrl}
                    // image='https://cataas.com/cat?width=160&height=120'
                    alt='random image'
                    height='120'
                    width='160'
                />
                <CardContent>
                    <Typography variant='h6'>{title}</Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>{substitle}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export function ListStoryCol({ storyList = [] }: { storyList: Story[] }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-6">
            {
                storyList.map((story) => {
                    return (
                        <Card sx={{
                            boxShadow: 'none'
                        }}>
                            <CardActionArea onClick={() => navigate(`/truyen/${story._id}`)}>
                                <CardContent>
                                    <div className="flex gap-4">
                                        <img src={story.coverImage} alt="" className="aspect-square w-24 md:w-32 rounded-3xl object-cover" />
                                        <div className="flex flex-col self-stretch">
                                            <Typography variant="h6" className="-mt-1">{story.title}</Typography>
                                            <div className="flex-grow">
                                                <Markdown className="line-clamp-2 md:line-clamp-3">
                                                    {story.description}
                                                </Markdown>
                                            </div>
                                            <Typography variant="caption">
                                                <span>Last updated</span> - <span>{story.updateAt?.toDateString()}</span>
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export function ListCardHorizontal({ title, urlMore = '#', storyList = [] }: { title?: string, urlMore?: string, storyList?: Story[] }) {

    return (
        <div>
            <Link to={urlMore} style={{
                textDecoration: 'none',
                color: 'inherit'
            }}>
                <div className="px-4 py-4 group flex items-center gap-2">
                    <Typography variant='h5'>{title}</Typography>
                    <ArrowForwardIcon className="opacity-0 group-hover:opacity-100 -ml-8 group-hover:ml-0 transition-all" />
                    <ArrowForwardIcon className="opacity-100 group-hover:opacity-0 transition-opacity" />
                </div>
            </Link>
            <div className="overflow-x-auto" style={{
                maxWidth: '100vw',
                scrollbarWidth: 'thin',
            }}>
                <div className="flex gap-4 px-4 pb-4">
                    {
                        storyList.map((e, i) => {
                            return (
                                <StoryListItem
                                    title={e.title}
                                    imageUrl={e.coverImage ?? "https://cataas.com/cat?width=160&height=120"}
                                    url={`/truyen/${e._id}`}
                                    substitle='Latest chapter'
                                />
                            )
                        })
                    }

                    <Card className="shrink-0" sx={{
                        width: 160,
                        display: 'grid'
                    }}>
                        {/* @ts-expect-error */}
                        <CardActionArea LinkComponent={Link} to={urlMore}>
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