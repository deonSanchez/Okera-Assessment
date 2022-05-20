import { Button, Container, Grid, Typography } from '@mui/material';
import CharacterInfo from 'components/CharacterInfo';
import useFetch from 'hooks/useFetch';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const CharacterDetails = (): JSX.Element => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  let { page } = useParams();

  const { data, loading, error } = useFetch(
    'https://www.anapioficeandfire.com/api/characters/',
    id
  );

  const handleBack = () => {
    navigate(`/character/${page}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error?.message}</div>;
  }

  return (
    <Container>
      <Grid container direction="column">
        <Grid item container justifyContent="center" mt={2} mb={5}>
          <Typography variant="h5">
            Game of Thrones Character Details
          </Typography>
        </Grid>
        <Grid item>
          <CharacterInfo characterData={data} />
        </Grid>
        <Grid container item justifyContent="flex-end" mt={5}>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={handleBack}
            variant="contained"
            size="large"
          >
            Back to Character Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CharacterDetails;
