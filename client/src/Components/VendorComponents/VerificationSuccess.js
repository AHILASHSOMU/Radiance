import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import successImg from '../../public/images/success.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#3A3131',
    height: '100%',
    width: '100vw',
    marginTop: theme.spacing(18),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImg: {
    width: '300px',
    height: '100px',
    objectFit: 'contain',
    marginBottom: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

function EmailVerifiedSuccess() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="xs">
      <img src={successImg} alt="success_img" className={classes.successImg} />
      <Typography variant="h4" align="center" gutterBottom>
        Email verified successfully
      </Typography>
      <Link to="/vendor/vendorsignin">
        <Button variant="contained" color="primary" size="small" className={classes.button}>
          Signin
        </Button>
      </Link>
    </Container>
  );
}

export default EmailVerifiedSuccess;
