import { Button, ButtonGroup, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function PageStudioChapterSelector() {
    const navigate = useNavigate();
    function handleModifyButtonClick(id: string | number) {
        navigate(`${id}`)

    }
    return (
        <Container>
            <div className="flex mb-4">
                <Typography variant="h6" className="flex-grow">Chapter list</Typography>
                <Button variant="contained" size="small">new chapter...</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Reads</TableCell>
                            <TableCell>Creation date</TableCell>
                            <TableCell>Last update</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            hover
                        >
                            <TableCell>1</TableCell>
                            <TableCell>A warm welcome</TableCell>
                            <TableCell>5 read(s)</TableCell>
                            <TableCell>2024-12-12</TableCell>
                            <TableCell>2024-12-12</TableCell>
                            <TableCell>
                                <ButtonGroup variant="contained">
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        handleModifyButtonClick("1");
                                    }}>Modify</Button>
                                    <Button color="error">Delete</Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}