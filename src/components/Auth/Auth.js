// Npm packages
import React, { useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

// material ui components
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// components
import Input from "./Input";
import Icon from "./icon";
import { signup, signin } from '../../actions/auth';

// styles
import useStyles from "./styles";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {

  // States
  const [formData, setFormData] = useState(initialState);
  const [ showPassword, setShowPassword ] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
 
  // consts
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   * Method to handle the handle show password 
   */
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  /**
   * Method to handle input change.
   * @param {object} e 
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  /**
   * Method to handle the on submit
   * @param {object} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate)) 
    }
  };

  /**
   * Method to handle the switch mode
   */
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  const googleSuccess = async (res) => {
     const result = res?.profileObj;
     const token = res?.tokenId;

     try {
        dispatch ({ type: 'AUTH', data: { result, token }});
        navigate('/');
     } catch (error) {
        console.log(error);
     }
  }
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google sign in was unsuccessful. Try again later");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label='Repeat Password' handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin 
            clientId="171791983714-h2qrcr2l0bpka3go7ibbjht9e7dff400.apps.googleusercontent.com"
            render={(renderProps) => (
                <Button
                 className={classes.googleButton}
                 color="primary"
                 fullWidth
                 onClick={renderProps.onClick}
                 disabled={renderProps.disabled}
                 startIcon={<Icon />}
                 variant="contained"
                >
                    Google Sign In 
                </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
                <Button onClick={switchMode}>
                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
