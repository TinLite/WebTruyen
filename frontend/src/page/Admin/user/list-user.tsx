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

export default function ListUser() {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    listUser()
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Displayname</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right" className="">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow
              key={u._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar
                  alt={u.displayname.charAt(0)}
                  src={u.avatar}
                  sx={{ width: 34, height: 34 }}
                />
              </TableCell>
              <TableCell align="right">{u.username}</TableCell>
              <TableCell align="right">{u.displayname}</TableCell>
              <TableCell align="right">{u.email}</TableCell>
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
