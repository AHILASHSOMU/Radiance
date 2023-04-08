import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiCalls from "../../EndPoints/UserApiCalls"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    
  },
  card: {
    borderRadius: '15px',
    maxWidth: '480px',
    width: '100%',
    backgroundColor:"#3A3131"
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  submitButton: {
    margin: theme.spacing(3, 0),
  },
}));

function ResendEmail() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const values = { email: email };
    const data = await apiCalls.resendOTP(values);
    if (data.message) {
      toast.error(data.message);
    } else if (data.status === 'pending') {
      const id = data.userId;
      toast.success(data.send);
      navigate(`/emailVerification/${id}`);
    }
    formRef.current.reset();
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Enter your email
          </Typography>
          <form onSubmit={onSubmit} ref={formRef} className={classes.form}>
            <TextField
              
              type="text"
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResendEmail;
