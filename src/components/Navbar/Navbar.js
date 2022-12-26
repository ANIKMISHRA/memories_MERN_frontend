// NPm packages
import React from 'react';
import { Link } from 'react-router-dom';

// material ui components
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';

// images
import memories from '../../images/images2.jpeg';

// styles
import useStyles from './styles';
const Navbar = () => {
    const classes = useStyles();

    const user = null;
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
                    <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
                </div>
            ): (
                <Button component={Link} to="/auth" variant="contained" color="primary">sign In</Button>
            )}
        </Toolbar>
   
  </AppBar>
  )
}

export default Navbar