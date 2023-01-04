// Npm packages
import { Box, Card, Avatar, Typography, Button, Grid } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core';
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Post from "../Posts/Post/Post";
import { userPorfile } from "../../actions/auth";

// styles
import useStyle from "./styles";
import { getPosts } from "../../actions/posts";

const UserProfile = () => {
    
    useEffect(() => {
     dispatch(userPorfile(user?._id || gUser?.result?._id));
     dispatch(getPosts());   
      setUserPosts(!toggle ? createdPost : likedPost);
    }, [])
    
    // consts
    const user = useSelector((state) => state?.auth?.user);
    const { posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const gUser = JSON.parse(localStorage.getItem("profile"));
    const createdPost = posts?.filter((post) => post.creator === user?._id);
    const likedPost = posts?.filter((l) => l.likes.map((e) => e === user?._id));
    console.log(likedPost);
    
    const randomImage =
    "https://source.unsplash.com/1600x900/?mountain, snowfall, sea";
    const classes = useStyle();
    
    
    // states
    const [toggle, setToggle] = useState(false);
    const [userPosts, setUserPosts] = useState(!toggle ? createdPost : likedPost);


  return (
    <>
      <Card raised elevation={6}>
        <div className={classes.randomImageContainer}>
          <img
            src={randomImage}
            className={classes.randomImageStyles}
            alt="banner-pic"
          />
        </div>
      </Card>
      <div className={classes.randomImageContainer}>
        <Avatar
          className={classes.purple}
          alt={user?.name}
          src={gUser?.result?.imageUrl}
        >
          {user?.name?.charAt(0)}
        </Avatar>
        <Typography className={classes.userName} variant="h6">
          {user?.name || gUser?.result?.name}
        </Typography>
      </div>
      <div >
        <Box  display="flex" justifyContent="space-between" >
            <Button onClick={() => setToggle(false)} color="primary" variant="contained">Created</Button>
            <Button onClick={() => setToggle(true)} color="primary" variant="contained">Liked</Button>
        </Box>
      </div>{
      isLoading ? <CircularProgress color='secondary' /> : (
      <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}> 
         {userPosts?.length > 0 && userPosts?.map((post, i) => (
               <Grid key={i} item xs={12} sm={12} md={6} lg={6} >
                <Post post={post} />
               </Grid>     
         ))}
    </Grid>
    
    )}
    </>
  );
};

export default UserProfile;
