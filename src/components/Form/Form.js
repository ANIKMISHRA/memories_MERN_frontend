// NPm packages
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from "../../actions/posts";

// material ui components
import { TextField, Typography, Button, Paper } from "@material-ui/core";

// styles
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  // states
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // consts
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  /**
   * Component did mount
   */
  useEffect(() => {
    // if (!post?.title) clear();
    if(post) setPostData(post);
  }, [post])

  /**
   * Method to handle submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate ))
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  };

  /**
   * Method to handle the clear
   */
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });

  }

 
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a memory</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value.trimStart()})}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth multiline minRows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value.trimStart()})}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.trimStart().split(',')})}
        />
        <div className={classes.fileInput} >
          <FileBase 
             type="file"
             multiple={false}
             onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />  
        </div>
        <Button className={classes.buttonSubmit} disabled={ !postData.title.length > 0 && !postData.message.length > 0 }  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
