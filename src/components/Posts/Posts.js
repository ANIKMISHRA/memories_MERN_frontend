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
  const { posts, isLoading } = useSelector((state) => state.posts)
    const classes = useStyles();

    if (!posts.length && !isLoading) return <p style={{ color: 'white', fontSize: '30px'}}>No posts available</p>;
    
  return (
    isLoading ? <CircularProgress color='secondary' /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
         {posts?.map((post, i) => (
               <Grid key={i} item xs={12} sm={12} md={6} lg={4} >
                <Post post={post} setCurrentId={setCurrentId} />
               </Grid>     
         ))}
      </Grid>
    )
   
  )
}

export default Posts