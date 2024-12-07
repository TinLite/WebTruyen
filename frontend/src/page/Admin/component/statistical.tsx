import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const statistics = [
  { tableName: "User", count: 100 },
  { tableName: "Story", count: 75 },
  { tableName: "Comments", count: 250 },
];
export default function Statistical() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Thống kê số lượng theo bảng
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Tên Bảng</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Số Lượng</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statistics.map((stat, index) => (
              <TableRow key={index}>
                <TableCell>{stat.tableName}</TableCell>
                <TableCell align="right">{stat.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
