import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import apiCalls from '../../EndPoints/VendorApiCalls';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    borderRadius: '15px',
    maxWidth: '580px',
    width: '100%',
    backgroundColor: '#3A3131'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    backgroundColor: '#3A3131',
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  otpText: {
    marginTop: theme.spacing(3),
  },
  showPass: {
    cursor: 'pointer',
    marginLeft: theme.spacing(1),
  },
}));


function EmailVerification(props) {
    const classes = useStyles();
    const id = props.userId;
    const [errorMessage, setErrorMessage] = useState('');
    const [passShow, setPassShow] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const formRef = useRef(null);
  
    const onSubmit = async (event) => {
      event.preventDefault();
      const values = { otp: password };
      const data = await apiCalls.verifyOTP(values, id);
      if (data.message) {
        setErrorMessage(data.message);
        toast.error(data.message);
      } else {
        toast.success(data.success);
        navigate('/vendor/verificationSuccess');
      }
      formRef.current.reset();
    };
  
    return (
      <div className={classes.root}>
        
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Enter the OTP sent to your email here
            </Typography>
            <form onSubmit={onSubmit} ref={formRef} className={classes.form}>
              <TextField
                type={passShow ? 'text' : 'password'}
                label="OTP"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Typography
                      variant="body2"
                      className={classes.showPass}
                      onClick={() => setPassShow(!passShow)}
                    >
                      {passShow ? 'Hide' : 'Show'}
                    </Typography>
                  ),
                }}
              />
              {errorMessage && <div className={classes.errorMessage} style={{ color: 'red' }}>{errorMessage}</div>}
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
            <Link to="/resendOtp" className={classes.link}>
              <Typography variant="subtitle1" align="center" className={classes.otpText}>
                Resend OTP?
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  export default EmailVerification;
  