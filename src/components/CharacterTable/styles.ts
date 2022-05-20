import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  button: {
    marginTop: 16,
    textTransform: 'none',
  },
  tableCell: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f6f8fa',
    },
  },
  typography: {
    marginTop: 18,
  },
}));

export default useStyles;
