import React, { useState, FormEvent, ChangeEvent } from 'react';
import IntroContainer from '../IntroContainer/IntroContainer';
import {Typography,TextField, InputLabel, Grid, Theme, makeStyles, Button} from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppState } from '../../state';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme: Theme) => ({
    googleButton: {
      background: 'white',
      color: 'rgb(0, 94, 166)',
      borderRadius: '4px',
      border: '2px solid rgb(2, 122, 197)',
      margin: '1.8em 0 0.7em',
      textTransform: 'none',
      boxShadow: 'none',
      padding: '0.3em 1em',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      '&:hover': {
        background: 'white',
        boxShadow: 'none',
      },
    },
    errorMessage: {
      color: 'red',
      display: 'flex',
      alignItems: 'center',
      margin: '1em 0 0.2em',
      '& svg': {
        marginRight: '0.4em',
      },
    },
    gutterBottom: {
      marginBottom: '1em',
    },
    passcodeContainer: {
      minHeight: '120px',
    },
    submitButton: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  }));
  
export default function LoginPage() {
    const classes = useStyles();
    const { signIn, user, isAuthReady } = useAppState();
    const navigate = useNavigate();
    const location = useLocation();
    const [passcode, setPasscode] = useState('');
    const [authError, setAuthError] = useState<Error | null>(null);

    const login = () => {
        setAuthError(null);
        signIn?.(passcode)
          .then(() => {
            navigate("/video/room");
          })
          .catch(err => setAuthError(err));
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
      };

    return (
        <IntroContainer>    
          {process.env.REACT_APP_SET_AUTH === 'passcode' && (
            <>
              <Typography variant="h5" className={classes.gutterBottom}>
                Enter passcode to join a room
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container justifyContent="space-between">
                  <div className={classes.passcodeContainer}>
                    <InputLabel shrink htmlFor="input-passcode">
                      Passcode
                    </InputLabel>
                    <TextField
                      id="input-passcode"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPasscode(e.target.value)}
                      type="password"
                      variant="outlined"
                      size="small"
                    />
                    <div>
                      {authError && (
                        <Typography variant="caption" className={classes.errorMessage}>
                          <ErrorOutlineIcon />
                          {authError.message}
                        </Typography>
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!passcode.length}
                    className={classes.submitButton}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            </>
          )}
        </IntroContainer>
      );
}