// npm packages
import React from 'react';
import { useSelector } from 'react-redux';

// Material ui components
import { Grid } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

// components
import Post from './Post/Post';

import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts)
    const classes = useStyles();
    
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
         {posts.map((post, i) => (
               <Grid key={i} item xs={12} sm={6} >
                <Post post={post} setCurrentId={setCurrentId} />
               </Grid>     
         ))}
      </Grid>
    )
   
  )
}

export default Posts