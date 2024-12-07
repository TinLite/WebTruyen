import { ThumbUpOffAlt } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Card, CardActionArea, CardContent, Container, Divider, Grid2, IconButton, Typography } from "@mui/material";

function SectionComment() {

    function Comment({ username, body, likes = "0", isLiked = false, onLikeAction = () => { } }: { username: string, body: string, likes?: string, isLiked?: boolean, onLikeAction?: () => void }) {
        return (
            <div className="flex">
                <div>
                    <Typography variant="body1">{username}</Typography>
                    <Typography variant="body2">{body}</Typography>
                </div>
                <div className="flex flex-col items-center">
                    <IconButton>
                        {
                            isLiked ?
                                <ThumbUpOffAlt /> :
                                <ThumbUpOffAlt />
                        }
                    </IconButton>
                    <Typography variant="caption">{likes}</Typography>
                </div>
            </div>
        )
    }



    return (
        <Accordion className="my-8">
            <AccordionSummary>Bình luận (95)</AccordionSummary>
            <AccordionDetails>
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
                <Divider className="my-4" />
                <Comment username="teo192" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, facilis voluptatem ullam odit officiis, quibusdam eos doloremque ratione perspiciatis amet provident, nemo deleniti iste in. Tenetur et eligendi necessitatibus id?" />
            </AccordionDetails>
        </Accordion>
    )
}

export function PageReader() {
    return (
        <Container maxWidth="sm">
            <div>
                <Typography variant="h4">Chapter 1</Typography>
                <Typography variant="h5">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
                <div>
                    Est. read time: 26 mins
                </div>
            </div>
            <Divider className="my-4" />
            <div>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
                <Typography variant="body1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga cum, repellat soluta expedita repudiandae quo rerum omnis magnam ratione quis aliquid placeat sapiente voluptas qui dolore doloremque perferendis natus voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum delectus fuga totam in mollitia ducimus eligendi soluta blanditiis sequi reiciendis esse quo voluptatum, dolor aperiam perferendis vero maxime nihil veritatis!</Typography>
            </div>
            <Grid2 container className="mt-4">
                <Grid2 size={6}>
                    <Card sx={{
                        borderRadius: "0px"
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="caption" color="textSecondary">
                                    Tập trước
                                </Typography>
                                <Typography variant="h5">
                                    Tập 0
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>
                <Grid2 size={6}>
                    <Card sx={{
                        borderRadius: "0px"
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="caption" color="textSecondary">
                                    Tập sau
                                </Typography>
                                <Typography variant="h5">
                                    Tập 2
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>
            </Grid2>
            <SectionComment />
        </Container>
    )
}