import React, { useState, useContext } from 'react'
import '../../styles/nav.css'
import logo from '../../assets/img1.jpg'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useCookies } from 'react-cookie';

function Nav() {

    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    // Check if user is logged in (either Firebase user or admin token)
    // Check for token in cookies or localStorage as fallback
    const adminTokenFromCookie = cookies.token; // Only 'token' for admin
    const adminTokenFromStorage = localStorage.getItem('token'); // Only 'token' for admin
    const userTokenFromCookie = cookies.userid; // 'userid' for regular users
    const userTokenFromStorage = localStorage.getItem('userid'); // 'userid' for regular users
    
    const hasAdminToken = adminTokenFromCookie || adminTokenFromStorage;
    const hasUserToken = userTokenFromCookie || userTokenFromStorage;
    
    const isLoggedIn = user || hasAdminToken || hasUserToken;
    const isAdmin = hasAdminToken && !user; // Admin uses 'token' key and no Firebase user
    const isFirebaseUser = user && !hasAdminToken; // Firebase user without admin token

    // Debug logging
    console.log('Auth Debug:', {
        user: user,
        adminTokenFromCookie: adminTokenFromCookie,
        adminTokenFromStorage: adminTokenFromStorage,
        userTokenFromCookie: userTokenFromCookie,
        userTokenFromStorage: userTokenFromStorage,
        hasAdminToken: hasAdminToken,
        hasUserToken: hasUserToken,
        allCookies: cookies,
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        isFirebaseUser: isFirebaseUser
    });

    // Additional debug for profile click
    console.log('Profile Click Debug:', {
        'Will redirect to': !isLoggedIn ? '/userlogin' : (isAdmin ? '/admin' : '/userprofile'),
        'Reason': !isLoggedIn ? 'Not logged in' : (isAdmin ? 'Has admin token' : 'Firebase user without token')
    });

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

    const handleProfileClick = () => {
        console.log('Profile clicked! Current state:', {
            isLoggedIn,
            isAdmin,
            isFirebaseUser,
            hasAdminToken,
            hasUserToken,
            user: user?.email || 'No user'
        });
        
        if (!isLoggedIn) {
            // Not logged in, redirect to login selection
            console.log('Redirecting to /userlogin - not logged in');
            navigate('/userlogin');
        } else if (isAdmin) {
            // Admin user, go to admin dashboard
            console.log('Redirecting to /admin - admin user detected');
            navigate('/admin');
        } else {
            // Regular user, go to user profile
            console.log('Redirecting to /userprofile - regular user');
            navigate('/userprofile');
        }
    };

    const handleLogout = async () => {
        try {
            if (isFirebaseUser) {
                await logout(); // Firebase logout
            }
            if (isAdmin) {
                removeCookie('token', { path: '/' }); // Remove admin token from cookie
                localStorage.removeItem('token'); // Remove token from localStorage
            }
            if (hasUserToken) {
                removeCookie('userid', { path: '/' }); // Remove userid token from cookie
                localStorage.removeItem('userid'); // Remove userid from localStorage
            }
            // Always redirect to homepage after logout
            navigate('/');
            window.location.reload(); // Refresh to ensure clean state
        } catch (error) {
            console.error('Logout error:', error);
            // Even if logout fails, redirect to homepage
            navigate('/');
        }
    };

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

                    {/* Show Login/Signup only when not logged in */}
                    {!isLoggedIn && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => navigate('/userlogin')}
                                size="small"
                            >
                                Login
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => navigate('/usersignup')}
                                size="small"
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}

                    {/* Show Profile icon and Logout only when logged in */}
                    {isLoggedIn && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                onClick={handleProfileClick}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                onClick={handleLogout}
                                size="small"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
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
                        <MenuItem onClick={handleProfileClick}>
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
                        
                        {/* Login/Logout in mobile menu */}
                        {!isLoggedIn ? (
                            <>
                                <MenuItem onClick={() => navigate('/userlogin')}>
                                    <p>Login</p>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/usersignup')}>
                                    <p>Sign Up</p>
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={handleLogout}>
                                <p>Logout</p>
                            </MenuItem>
                        )}
                    </Menu>
                </div>
            </div>
      
    )
}

export default Nav