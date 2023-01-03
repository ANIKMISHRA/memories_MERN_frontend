// Npm packages
import React, { useState, useRef } from "react";
import { useDispatch } from 'react-redux';

// Material ui components
import { Typography, TextField, Button } from '@material-ui/core';

// components
import { commentPost } from '../../actions/posts';

// styles
import useStyles from './styles';

const CommentSections = ({ post }) => {

    // states
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
   
    // consts
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    /**
     * Method to handle the click of button.
     */
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

      const newComments = await dispatch(commentPost(finalComment, post._id));

      setComments(newComments);
      setComment('');

      commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }


    return (
        <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h4">Comments :</Typography>
                {comments?.map((c, i) => (
                    <Typography gutterBottom variant="subtitle1" key={i}>
                      <strong>{c.split(': ')[0]}</strong>
                      {c.split(':')[1]}  
                    </Typography>
                ))}
                <div ref={commentsRef} />
            </div>
            { user?.result?.name && (
            <div style={{ width: '70%'}}>
                <Typography gutterBottom variant="h6">Write a comment</Typography>
                <TextField 
                  fullWidth
                  variant="outlined"
                  label='Comment'
                  maxRows={4}
                  multiline
                  value={comment}
                  onChange={(e) => setComment(e.target.value.trimStart())}
                />
                <Button style={{marginTop: '10px'}}  fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick}>Comment</Button>
            </div>
            )}
        </div>
        </div>
    )
}
export default CommentSections;
