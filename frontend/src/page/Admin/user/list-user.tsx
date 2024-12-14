import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Modal,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { User } from "../../../types/user-type";
import {
  deleteUser,
  listUser,
  lockUser,
  unlockUser,
} from "../../../repositories/user-repository";
import { adminUpdateUser } from "../../../repositories/user-repository";
import LockOpenIcon from "@mui/icons-material/LockOpen";
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ListUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [openlock, setOpenlock] = useState(false);
  const [openUnlock, setOpenUnlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  var [click, setClick] = useState("");

  const handleClickDelete = () => {
    setOpenDelete(true);
  };
  const handleClickDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleClickUnOpen = () => {
    setOpenUnlock(true);
  };
  const handleClickUnClose = () => {
    setOpenUnlock(false);
  };
  const handleClickOpen = () => {
    setOpenlock(true);
  };
  const handleClickClose = () => {
    setOpenlock(false);
  };
  const [formData, setFormData] = useState({
    username: "",
    displayname: "",
    email: "",
  });
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

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setFormData({
      displayname: user.displayname,
      email: user.email,
      username: user.username,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      adminUpdateUser(selectedUser._id, formData)
        .then(() => {
          setUsers(
            users.map((u) =>
              u._id === selectedUser._id ? { ...u, ...formData } : u
            )
          );
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLockUser = async (id: string) => {
    await lockUser(id)
      .then(() => {
        fetchUsers();
        setOpenlock(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUnlockUser = async (id: string) => {
    await unlockUser(id)
      .then(() => {
        fetchUsers();
        setOpenUnlock(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteUser = async (id: string) => {
    await deleteUser(id)
      .then(() => {
        fetchUsers();
        setOpenDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Displayname</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Action</TableCell>
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
                    startIcon={<VisibilityIcon />}
                    className="mr-2"
                    size="small"
                    onClick={() => handleOpen(u)}
                  ></Button>
                  {u.status === true ? (
                    <Button
                      variant="outlined"
                      startIcon={<LockPersonIcon />}
                      className="mr-2"
                      size="small"
                      color="warning"
                      onClick={() => {
                        setClick(u._id);
                        handleClickOpen();
                      }}
                    ></Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<LockOpenIcon />}
                      className="mr-2"
                      size="small"
                      color="warning"
                      onClick={() => {
                        setClick(u._id);
                        handleClickUnOpen();
                      }}
                    ></Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    size="small"
                    onClick={() => {
                      setClick(u._id);
                      handleClickDelete();
                    }}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2>Edit User Information</h2>
          <div>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              margin="normal"
              name="username"
              onChange={InputChange}
              // disabled
            />
            <TextField
              fullWidth
              label="Displayname"
              value={formData.displayname}
              margin="normal"
              name="displayname"
              onChange={InputChange}
            />
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              margin="normal"
              name="email"
              onChange={InputChange}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdateUser}
                color="primary"
              >
                Save
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
      <Dialog
        open={openlock}
        keepMounted
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"LOCK USER ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to lock this user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={() => handleLockUser(click)}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUnlock}
        keepMounted
        onClose={handleClickUnClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"UNLOCK USER ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to unlock this user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickUnClose}>Cancel</Button>
          <Button onClick={() => handleUnlockUser(click)}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        keepMounted
        onClose={handleClickDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"DELETE USER ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to delete this user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDeleteClose}>Cancel</Button>
          <Button onClick={() => handleDeleteUser(click)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
