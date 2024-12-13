import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { comment } from "@/types/comment-type";
import {
  deleteComment,
  listComment,
} from "../../../repositories/comment-repository";
import { useNavigate, useParams } from "react-router-dom";
export default function ListComment() {
  const [comments, setcomments] = useState<comment[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const fetchComment = async () => {
    listComment()
      .then((data) => {
        console.log(data);
        setcomments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchComment();
  }, []);
  const handleRemoveComment = async (id: string) => {
    await deleteComment(id)
      .then(() => {
        fetchComment();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleViewComment = async (id: string) => {
      alert("Thằng Tèo chưa nhéc đường link view bạn ơi :)))");
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Content Comment</TableCell>
            <TableCell align="right">Name Story</TableCell>
            <TableCell align="right">Chapter Number</TableCell>
            <TableCell align="right">CreateAt</TableCell>
            <TableCell align="right" className="">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((c) => (
            <TableRow
              key={c._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar
                  alt={c.author.displayname}
                  src={c.author.avatar}
                  sx={{ width: 34, height: 34 }}
                />
              </TableCell>
              <TableCell align="right">{c.content}</TableCell>
              <TableCell align="right">{c.storyId.title}</TableCell>
              <TableCell align="right">
                Chapter {c.chapterId.ChapterNumber}
              </TableCell>
              <TableCell align="right">
                {new Date(c.created_at).toLocaleString("vi-VN")}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  className="mr-2"
                  size="small"
                  onClick={() => handleViewComment(c._id)}
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
                  <DialogTitle>{"DELETE COMMENT?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Do you want to delete this comment?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() =>
                        handleRemoveComment(c._id).then(() => {
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
