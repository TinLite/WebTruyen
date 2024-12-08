import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { listCount } from "../../../repositories/comment-repository";
export default function Statistical() {
  const [count, setCount] = useState<{
    users: number;
    stories: number;
    comment: number;
  }>({
    users: 0,
    stories: 0,
    comment: 0,
  });
  const fetchCount = async () => {
     await listCount()
      .then((data) => {  
        setCount(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCount();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4, boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="statistical table">
        <TableHead >
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Users</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }} align="center">
              Stories
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }} align="center">
              Comments
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontSize: "0.9rem" }}>{count.users}</TableCell>
            <TableCell sx={{ fontSize: "0.9rem" }} align="center">
              {count.stories}
            </TableCell>
            <TableCell sx={{ fontSize: "0.9rem" }} align="center">
              {count.comment}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
