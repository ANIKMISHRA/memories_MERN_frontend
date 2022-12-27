// NPm packages
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material ui components
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';

// images
import memories from '../../images/images2.jpeg';

// styles
import useStyles from './styles';
const Navbar = () => {

    // state
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    // consts
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Method to handle logout
     */
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
             {/* <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography> */}
            <Link to='/'><img className={classes.image} src={memories} alt="memories" height="60" width="100px" /></Link>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                </div>
            ): (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
   
  </AppBar>
  )
}

export default Navbar