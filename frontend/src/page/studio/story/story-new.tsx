import { Breadcrumbs, Button, Container, Link, TextField, TextFieldProps, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function PageStudioStoryNew() {
    const inputTheme: TextFieldProps = {
        variant: "filled"
    }
    return <Container>
        <div className="my-12">
            <Breadcrumbs>
                <Link color="inherit" underline="hover" component={RouterLink} to="/">Homepage</Link>
                <Link color="inherit" underline="hover" component={RouterLink} to="/studio">Creator Studio</Link>
            </Breadcrumbs>
            <Typography variant="h4">Create new story</Typography>
        </div>
        <div className="my-8">
            <div className="flex flex-col gap-2 flex-grow">
                <TextField {...inputTheme} label="Story title" />
                <TextField {...inputTheme} multiline label="Description" minRows={2} />
            </div>
        </div>
        <div className="flex justify-end gap-2">
            {/* @ts-expect-error */}
            <Button variant="outlined" LinkComponent={RouterLink} to="/studio">Cancel</Button>
            <Button variant="contained">Create</Button>
        </div>
    </Container>
}