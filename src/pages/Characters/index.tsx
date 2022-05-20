import { Container, Grid, Typography } from '@mui/material';
import CharacterTable from 'components/CharacterTable';
import SearchBar from 'components/SearchBar';
import useFetch from 'hooks/useFetch';
import { useParams, useSearchParams } from 'react-router-dom';

const Characters = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  let { page } = useParams();

  const searchArg = name
    ? `https://www.anapioficeandfire.com/api/characters?name=`
    : `https://www.anapioficeandfire.com/api/characters?page=`;

  const { data, loading, error } = useFetch(searchArg, name || page);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Container>
        <Grid container direction="column" spacing={3}>
          <Grid item container justifyContent="center" mt={2}>
            <Typography variant="h5">
              Game of Thrones Character Search
            </Typography>
          </Grid>
          <Grid item>
            <SearchBar />
          </Grid>
          <Grid item>
            <CharacterTable
              page={page}
              data={data}
              hidden={!!name}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Characters;
