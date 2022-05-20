import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { TextField, Grid, Button } from '@mui/material';
import useStyles from './styles';

const SearchBar = (): JSX.Element => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  let navigate = useNavigate();

  const handleSearch = () => {
    navigate({
      pathname: `/character`,
      search: createSearchParams({ name: searchValue }).toString(),
    });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <Grid container justifyContent="flex-start" alignItems="center" spacing={3}>
      <Grid item xs>
        <TextField
          fullWidth
          placeholder="Search Character Name"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          size="small"
          value={searchValue}
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          onClick={handleSearch}
          variant="contained"
          size="large"
        >
          Search Character
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
