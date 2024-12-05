import { BookmarkBorder } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActionArea, CardContent, Container, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function PageStoryDetail() {
    const navigate = useNavigate();

    const actions = (
        <>
            <Button variant="contained">Continue reading</Button>
            <Button variant="outlined">Save to bookmark</Button>
        </>
    )
    return (
        <Container>
            <div className="flex gap-6 mt-2">
                <div>
                    <img src="https://cataas.com/cat" alt="" className="aspect-square w-24 md:w-52 rounded-3xl object-cover" />
                </div>
                <div className="flex flex-col gap-2 self-stretch">
                    <div className="flex-grow">
                        <Typography variant="h4">Tên truyện</Typography>
                        <Typography variant="caption">Last update: 01/01/2024</Typography>
                        <Typography className="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio hic voluptatem suscipit? Officiis numquam quo, cum asperiores quisquam voluptate temporibus repellat modi qui, vel fugit odio adipisci eveniet totam iure.</Typography>
                    </div>
                    <div className="gap-6 hidden md:flex">
                        {actions}
                    </div>
                    <div className="flex gap-6">
                        <div className="flex gap-2">
                            <Rating defaultValue={2.5} precision={0.5} />
                            <span>2.5/5</span>
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
            <div className="mt-4">
                <Accordion defaultExpanded>
                    <AccordionSummary>Volume 1: Lorem</AccordionSummary>
                    <AccordionDetails>
                        <div className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos dolorem adipisci incidunt fugit tenetur accusantium et deleniti iusto aut minima voluptatem architecto vero repellendus hic similique, minus facere. Illum?
                        </div>
                        <div className="flex flex-col gap-6">
                            <Card sx={{
                                boxShadow: 'none'
                            }}>
                                <CardActionArea onClick={() => navigate("/read/1")}>
                                    <CardContent>
                                        <div className="flex gap-4">
                                            <img src="https://cataas.com/cat?width=256&height=256" alt="" className="aspect-square w-24 md:w-32 rounded-3xl object-cover" />
                                            <div className="flex flex-col self-stretch">
                                                <Typography variant="h6" className="-mt-1">Chapter 1: Lorem</Typography>
                                                <div className="flex-grow">
                                                    <Typography variant="body2" className="line-clamp-2 md:line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad placeat vitae quo itaque necessitatibus quis sint, eligendi voluptatem vero in aut pariatur ratione quasi quisquam illum facere nihil maiores illo?</Typography>
                                                </div>
                                                <Typography variant="caption">
                                                    <span>Today</span> - <span>24 mins</span>
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Container>
    )
}