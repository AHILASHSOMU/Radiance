import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import apiCalls from '../../EndPoints/UserApiCalls';
import { Button, Card, CardContent, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(20),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    maxWidth: 480,
    borderRadius: 15,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
    backgroundColor: '#3A3131'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  inputField: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
  successMessage: {
    color: "green",
    marginTop: theme.spacing(2),
  }
}));

function ForgotPasswordSend() {

  const classes = useStyles();
  const [email, setEmail] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const formRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    const values = { email: email };
    const data = await apiCalls.sendResetLink(values);
    if (data.error) {
      toast.error(data.error)
    } else if (data.status) {
      setSuccessMessage(data.message);
      toast.success(data.message)
    }
    formRef.current.reset();
  }

  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" align="center" gutterBottom>
            Enter your email
          </Typography>
          <form onSubmit={onSubmit} ref={formRef}>
            <TextField
              className={classes.inputField}
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Send
            </Button>
            {successMessage && (
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.successMessage}
              >
                {successMessage}
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ForgotPasswordSend;
