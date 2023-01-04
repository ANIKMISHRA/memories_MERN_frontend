// NPm packages
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

// material ui components
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';

// images
import memories from '../../images/images2.jpeg';

// styles
import useStyles from './styles';
const Navbar = () => {

    // state
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

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

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }

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
                    <Link to={`/user/${user?.result?._id}`}> <Avatar   className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar></Link>
                  <Link to={`/user/${user?.result?._id}`} >  <Typography   className={classes.userName} variant="h6">{user.result.name}</Typography></Link>
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