import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'

// MUI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

/*
╔═══════════════════════════════════════════╗
║       function AppHeader (Komponente)     ║
╚═══════════════════════════════════════════╝
*/
function AppHeader(props) {

    /* ════════ User Menü ════════ */
    const menu_user = [
        { name: 'Profil', page: "/profil" },
        { name: 'Info', page: "/info" },
        { name: 'Logout', click: abmelden }
    ];

    /* ════════ Gast Menü ════════ */
    const menu_gast = [
        { name: 'Anmelden', page: "/anmelden" },
        { name: 'Registrieren', page: "/registrieren" },
        { name: 'Info', page: "/info" }
    ];

    let menu = !props.user?.email ? menu_gast : menu_user

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate()

    function abmelden() {
        localStorage.clear()
        window.location = "/"
    }

    return (
        <header className="appHeader">
            <div className="menuBack" onClick={props.back ? () => { props.back() } : () => { }} >{props.back ?
                <img src={require('../img/back.svg').default} alt="Zurück" />
                : false}</div>

            <div className="appTitle">{props.titel}</div>

            {/*  props.menu  */}
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Menü">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <img src={require('../img/menu.svg').default} alt="Menü" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {menu.map((setting, index) => (
                        <MenuItem key={index} onClick={() => {
                            setting.click ?
                                setting.click() :
                                navigate(setting.page)
                        }}>
                            <Typography textAlign="center">{setting.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

        </header>

    );
}

export default connect(mapStateToProps)(AppHeader);