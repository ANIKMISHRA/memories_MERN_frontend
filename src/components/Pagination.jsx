// Npm packages
import React from "react";
import { Link } from 'react-router-dom';

// material ui components 
import { Pagination, PaginationItem } from '@material-ui/lab';

// styles
import useStyles from "./styles";

const Paginate = () => {
    const classes = useStyles();

    return (
        <Pagination 
          classes={{ ul: classes.ul}}
          count={5}
          page={1}
          variant="outlined"
          color="primary"
          renderItem={(item) => (
            <PaginationItem  {...item} component={Link} to={`/posts?page=${1}`} />
          )}
        />
    )
}
export default Paginate;