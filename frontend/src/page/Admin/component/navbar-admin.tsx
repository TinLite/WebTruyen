import CommentIcon from '@mui/icons-material/Comment';
import PollIcon from '@mui/icons-material/Poll';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink, useNavigate } from 'react-router-dom';

export function NavBarAdmin() {
    const navigate = useNavigate();
    return (
        <List sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <ListItem disablePadding component={NavLink} to={"/admin/"} className='text-inherit'>
                <ListItemButton>
                    <ListItemIcon>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding component={NavLink} to={"/admin/story" } className='text-inherit'>
                <ListItemButton>
                    <ListItemIcon>
                        <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Stories" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={NavLink} to={"/admin/comment"} className='text-inherit'>
                <ListItemButton>
                    <ListItemIcon>
                        <CommentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={NavLink} to={"/admin/statistical"} className='text-inherit'>
                <ListItemButton>
                    <ListItemIcon>
                        <PollIcon />
                    </ListItemIcon>
                    <ListItemText primary="Statistical" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <div className="grow"></div>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </ListItem>
        </List>
    )
}