import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { User } from "../../../types/user-type";
import { listUser } from "../../../repositories/user-repository";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from "react";
import { comment } from "@/types/comment-type";
import { listComment } from "../../../repositories/comment-repository";
export default function ListComment() {
  const [comments, setcomments] = useState<comment[]>([]);
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
                >
                  Detail
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  size="small"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
