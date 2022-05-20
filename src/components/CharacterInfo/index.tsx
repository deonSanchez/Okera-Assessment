import { Grid, Typography } from '@mui/material';
import useFetch from 'hooks/useFetch';

interface CharacterInfoProps {
  characterData: any;
}

const CharacterInfo = ({ characterData }: CharacterInfoProps): JSX.Element => {
  const houseAPI = characterData?.['allegiances'][0] ?? '';

  const { data: houseData, loading, error } = useFetch(houseAPI, '', !houseAPI);

  const characterFormat = (key: string, value: any): JSX.Element => {
    const valueFormatString = Array.isArray(value) ? value?.join(', ') : value;

    return (
      <Grid item key={value?.url}>
        <Typography variant="h5">
          <b>{key.toUpperCase()}</b> :{' '}
          {valueFormatString === '' ? 'unknown' : valueFormatString}
        </Typography>
      </Grid>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Grid container direction="column">
      {characterData &&
        Object.keys(characterData)?.map((k) => {
          if (
            !(
              k === 'books' ||
              k === 'url' ||
              k === 'allegiances' ||
              k === 'povBooks' ||
              k === 'spouse'
            )
          ) {
            return characterFormat(k, characterData[k]);
          }
          return '';
        })}

      {houseData && (
        <>
          <Grid item container justifyContent="center" my={3}>
            <Typography variant="h5">House Details</Typography>
          </Grid>
          {Object.keys(houseData).map((k) => {
            if (
              !(
                k === 'swornMembers' ||
                k === 'url' ||
                k === 'cadetBranches' ||
                k === 'founder' ||
                k === 'overlord' ||
                k === 'currentLord' ||
                k === 'heir'
              )
            ) {
              return characterFormat(k, houseData[k]);
            }
            return '';
          })}
        </>
      )}
    </Grid>
  );
};

export default CharacterInfo;
