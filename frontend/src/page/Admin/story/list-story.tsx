import { Story } from "@/types/story-type";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  adminLockStory,
  listStory,
} from "../../../repositories/story-repository";
import { useNavigate } from "react-router-dom";

export default function ListStory() {
  const [Stories, setStories] = useState<Story[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const fetchStory = async () => {
    listStory()
      .then((data) => {
        console.log(data);
        setStories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemoveStory = async (id: string) => {
    await adminLockStory(id)
      .then(() => {
        fetchStory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStory();
  }, []);
  const handleViewStory = async (id: string) => {
    navigate(`/truyen/${id}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right" className="">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Stories.map((s) => (
            <TableRow
              key={s._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar
                  alt={s.title.charAt(0)}
                  src={s.coverImage}
                  sx={{ width: 34, height: 34 }}
                />
              </TableCell>
              <TableCell align="right">{s.title}</TableCell>
              <TableCell align="right">{s.genre}</TableCell>
              <TableCell align="right">{s.authorId.displayname}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  className="mr-2"
                  size="small"
                  onClick={() => handleViewStory(s._id)}
                ></Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  size="small"
                  onClick={handleClickOpen}
                ></Button>
                <Dialog
                  open={open}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"DELETE STORY ?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Do you want to delete this story ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() =>
                        handleRemoveStory(s._id).then(() => {
                          setOpen(false);
                        })
                      }
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
