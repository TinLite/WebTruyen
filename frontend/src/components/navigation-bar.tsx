import { UserContext } from '@/context/user-context';
import { logout } from '@/repositories/authentication-repository';
import { ArrowBack, FormatListNumbered, Logout } from '@mui/icons-material';
import BookIcon from '@mui/icons-material/Book';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadIcon from '@mui/icons-material/Upload';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useContext } from 'react';
import { NavLink, Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';

export function NavigationBar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { pathname: currentPath } = useLocation();
    function handleLogout() {
        logout().then((r) => {
            if (r.ok) {
                setUser(null);
            }
        })
    }
    return (
        <List sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <ListItem disablePadding component={NavLink} to={"/"} className='text-inherit'>
                <ListItemButton selected>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Homepage" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding component={NavLink} to={"/bookmark"} className='text-inherit'>
                <ListItemButton>
                    <ListItemIcon>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Followed stories" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reading history" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ImportContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Title list" />
                </ListItemButton>
            </ListItem>
            <Divider />
            {
                user ?
                    <>
                        <ListSubheader>Logged in as {user.displayname ?? user.username}</ListSubheader>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                    :
                    <ListItem disablePadding>
                        {/* @ts-expect-error */}
                        <ListItemButton LinkComponent={RouterLink} to="/login">
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>
            }
            <div className="grow"></div>
            <ListItem disablePadding>
                {/* @ts-expect-error */}
                <ListItemButton LinkComponent={RouterLink} to="/studio">
                    <ListItemIcon>
                        <UploadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add new story" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Setting" />
                </ListItemButton>
            </ListItem>
        </List>
    )
}

export function CreatorStudioNavigationBar() {
    const navigate = useNavigate();
    const { storyId } = useParams();
    return (
        <List sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <ListItem disablePadding>
                {/* @ts-expect-error */}
                <ListItemButton LinkComponent={RouterLink} to={`/studio/${storyId}`} className='text-inherit'>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Basic information" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                {/* @ts-expect-error */}
                <ListItemButton LinkComponent={RouterLink} to={`/studio/${storyId}/chapter`}>
                    <ListItemIcon>
                        <FormatListNumbered />
                    </ListItemIcon>
                    <ListItemText primary="Chapters" />
                </ListItemButton>
            </ListItem>
            <div className="grow"></div>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/studio")}>
                    <ListItemIcon>
                        <ArrowBack />
                    </ListItemIcon>
                    <ListItemText primary="Back" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Setting" />
                </ListItemButton>
            </ListItem>
        </List>
    )
}