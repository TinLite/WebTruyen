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
import { useEffect, useState } from "react";
import { story } from "@/types/story-type";
import { listStory } from "../../../repositories/story-repository";

export default function ListStory() {
  const [Stories, setStories] = useState<story[]>([]);
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
  useEffect(() => {
    fetchStory();
  }, []);
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
                  startIcon={<LockPersonIcon />}
                  className="mr-2"
                  size="small"
                  color="warning"
                >
                  Lock
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
