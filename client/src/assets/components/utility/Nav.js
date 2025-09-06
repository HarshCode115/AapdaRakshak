import React, { useState } from 'react'
import '../../styles/nav.css'
import logo from '../../assets/img1.jpg'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function Nav() {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNav = (navto) => {
        setAnchorEl(null);
        navigate(navto);
        
    };

    const handleMenuOpen = () => {

    }

    return (
    

            <div className='nav-container'>
                <div className="nav-left">

                    <img src={logo} alt="" />
                    <h2>Logo</h2>

                </div>
                <div className={'nav-center'}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/maps">Maps</a></li>
                        <li><a href="/donation">Donation</a></li>
                        <li><a href="/volunteerform">Volunteer</a></li>
                    </ul>
                </div>
                <div className="nav-right">


                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"

                        aria-haspopup="true"

                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>

                </div>
                <div id='menuside' >
                    <IconButton

                        id='menuicon'
                        onClick={handleClick}
                        size="large"
                        edge="end"
                        aria-label="account of current user"

                        aria-haspopup="true"

                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={(e)=>handleNav('/')}><p>Home</p></MenuItem>
                        <MenuItem onClick={(e)=>handleNav('/maps')}><p>Maps</p></MenuItem>
                        <MenuItem onClick={(e)=>handleNav('/donation')}><p>Donation</p></MenuItem>
                        <MenuItem onClick={(e)=>handleNav('/volunteerform')}><p>Contact</p></MenuItem>
                        <MenuItem>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <p>Notifications</p>
                        </MenuItem>
                        <MenuItem >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <p>Profile</p>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
      
    )
}

export default Nav