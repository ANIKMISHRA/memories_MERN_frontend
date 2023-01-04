// Npm packages
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

// Material ui components
import { Container, Grid, Grow, Paper, TextField, Button, AppBar } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input';

// components 
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';

// styles
import useStyles from './styles';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

  // states
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  // consts
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  /**
   * Method to handle the search post.
   */
  const searchPost = () => {
    if(search.trim() || tags ) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/')
    }
  };

  /**
   * Method to handle the key press to search.  
   * @param {object} e 
   */
  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchPost();
    }
  }

  /**
   * Method to handle the add of tags
   * @param {string} tag 
   * @returns array
   */
  const handleAdd = (tag) => setTags([...tags, tag]);

  /**
   * Method to handle the delete of the tags.
   * @param {string} tagToDelete 
   * @returns array
   */
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


  return (
    <Grow in>
    <Container maxWidth="xl">
      <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
        <AppBar className={classes.appBarSearch} position="static" color='inherit'>
          <TextField 
            name='search'          
            label="Search Memories"
            fullWidth
            onKeyPress={handleKeyPress}
            variant='outlined'
            value={search}
            onChange={(e) => setSearch(e.target.value.trimStart()) }
          />
          <ChipInput 
            style={{ margin: '10px 0'}}    
            variant="outlined"      
            label="Search Tags"
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
          <Button onClick={searchPost} disabled={!search.length > 0 } variant="contained" className={classes.searchButton} color="primary">Search</Button>
        </AppBar>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          {( !searchQuery && !tags.length) && (

          <Paper  elevation={6} className={classes.pagination}>
            <Pagination page={page} />
          </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home