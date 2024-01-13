import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import { Link as NavLink } from 'react-router-dom';
import LogoutConfirmDialog from './LogoutConfirmDialog';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserThunk } from '../../redux/thunks/UserThunks';

const linkStyle = { color: 'white', mr: 2, fontFamily: 'Raleway, Arial', textDecoration: 'none', fontSize: '20px', marginRight: ' 10px' };

export default function Navbar(): JSX.Element {
    const [open, setOpen] = useState(false);
    const handleOpen = (): void => {
        setOpen(true);
    };

    const user = useAppSelector((store) => store.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserThunk());
    }, []);

    return (
        <Box sx={{ flexGrow: 1, typography: 'body1' }}>
            <AppBar
                position="static"
                sx={{
                    background: '#2E3B55',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
            >
                <Toolbar >
                    <NavLink className="nav-link" to="/" style={linkStyle} >
                        Главная
                    </NavLink>
                    {user.data.status === "guest" && (
                        <NavLink className="nav-link" to="/login" style={linkStyle}>
                            Авторизация

                        </NavLink>
                    )}

                    {user.data.status === 'logged' &&
                        <>

                            <NavLink className="nav-link" to="/browse" style={linkStyle}>
                                Сервисы
                            </NavLink>
                            <Button onClick={handleOpen} color="inherit"    >
                                Выйти
                            </Button>

                        </>
                    }
                    <LogoutConfirmDialog open={open} setOpen={setOpen} />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
