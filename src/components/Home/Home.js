// Npm packages
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';

// Material ui components
import { Container, Grid, Grow } from '@material-ui/core'

// components 
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { getPosts } from '../../actions/posts';

// styles
import useStyles from '../../styles';

const Home = () => {

     // states
  const [currentId, setCurrentId] = useState(null);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId,dispatch])


  return (
    <Grow in>
    <Container>
      <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home