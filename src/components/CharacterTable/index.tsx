import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Grid,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate, createSearchParams } from 'react-router-dom';
import useStyles from './styles';

const MAX_PAGES = 214;
const MIN_PAGES = 1;

interface CharacterTableProps {
  page: string;
  data: any;
  loading?: boolean;
  hidden: boolean;
}

const CharacterTable = ({
  page,
  data,
  hidden,
  loading = false,
}: CharacterTableProps): JSX.Element => {
  const classes = useStyles();
  let pagination = parseInt(page) || 1;
  let navigate = useNavigate();

  const handleFirst = () => {
    navigate(`/character/${MIN_PAGES}`);
  };

  const handleLast = () => {
    navigate(`/character/${MAX_PAGES}`);
  };

  const handleNext = () => {
    pagination += 1;
    navigate(`/character/${pagination}`);
  };

  const handlePrevious = () => {
    pagination -= 1;
    navigate(`/character/${pagination}`);
  };

  const handleLink = (personUrl: string, pagination: number) => {
    const personId = personUrl.split('/').pop();

    navigate({
      pathname: `/character/${pagination}/details`,
      search: createSearchParams({ id: personId }).toString(),
    });
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name (Alias) </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell>Loading Data...</TableCell>
              </TableRow>
            )}
            {data?.map((person) => (
              <TableRow key={person.url}>
                <TableCell
                  className={classes.tableCell}
                  onClick={() => handleLink(person.url, pagination)}
                >
                  {person.aliases[0] !== ''
                    ? `${person.name} (${person.aliases[0]})`
                    : `${person.name}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item>
        {!hidden ? (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Button
                className={classes.button}
                data-testid="first-page-button"
                disabled={pagination === MIN_PAGES}
                sx={{ marginRight: 2 }}
                onClick={handleFirst}
                variant="contained"
                size="large"
              >
                First Page
              </Button>
              <Button
                className={classes.button}
                data-testid="previous-page-button"
                disabled={pagination === MIN_PAGES}
                onClick={handlePrevious}
                variant="contained"
                size="large"
              >
                Previous Page
              </Button>
            </Grid>
            <Grid item>
              <Typography
                className={classes.typography}
                data-testid="pagination-text"
              >
                Page {pagination} of {MAX_PAGES}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                data-testid="next-page-button"
                disabled={pagination === MAX_PAGES}
                sx={{ marginRight: 2 }}
                onClick={handleNext}
                variant="contained"
                size="large"
              >
                Next Page
              </Button>
              <Button
                className={classes.button}
                data-testid="last-page-button"
                disabled={pagination === MAX_PAGES}
                onClick={handleLast}
                variant="contained"
                size="large"
              >
                Last Page
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container item justifyContent="flex-end">
            <Button
              className={classes.button}
              data-testid="back-character-button"
              onClick={handleFirst}
              variant="contained"
              size="large"
            >
              Back To Characters
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CharacterTable;
