import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import BookIcon from '@mui/icons-material/Book';

export function NavigationBar() {
    return (
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trang chủ" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đã lưu" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ImportContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Duyệt truyện" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đăng nhập" />
                </ListItemButton>
            </ListItem>
        </List>
    )
}