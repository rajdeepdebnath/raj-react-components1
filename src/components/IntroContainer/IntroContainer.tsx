
import { useLocation } from 'react-router-dom';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { useAppState } from '../../state';
import Swoosh from './Swoosh';

const useStyles = makeStyles((theme: Theme) => ({
    background: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgb(40, 42, 43)',
      height: '100%',
    },
    container: {
      position: 'relative',
      flex: '1',
    },
    innerContainer: {
      display: 'flex',
      width: '888px',
      height: '379px',
      borderRadius: '8px',
      boxShadow: '0px 2px 4px 0px rgba(40, 42, 43, 0.3)',
      overflow: 'hidden',
      position: 'relative',
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        height: 'auto',
        width: 'calc(100% - 40px)',
        margin: 'auto',
        maxWidth: '400px',
      },
    },
    swooshContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: Swoosh,
      backgroundSize: 'cover',
      width: '296px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100px',
        backgroundPositionY: '140px',
      },
    },
    logoContainer: {
      position: 'absolute',
      width: '210px',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        textAlign: 'initial',
        '& svg': {
          height: '64px',
        },
      },
    },
    twilioLogo: {
      position: 'absolute',
      top: 0,
      left: 0,
      margin: '20px',
    },
    content: {
      background: 'white',
      width: '100%',
      padding: '4em',
      flex: 1,
      [theme.breakpoints.down('sm')]: {
        padding: '2em',
      },
    },
    title: {
      color: 'white',
      margin: '1em 0 0',
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        fontSize: '1.1rem',
      },
    },
  }));

interface IntroContainerProps {
    children: React.ReactNode;
  }
  
  const IntroContainer = (props: IntroContainerProps) => {
    const classes = useStyles();
    const { user } = useAppState();
    const location = useLocation();
  
    return (
      <div className={classes.background}>
        <div />
        {/* {user && location.pathname !== '/login' && <UserMenu />} */}
        {user && location.pathname !== '/login'}
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <div className={classes.swooshContainer}>
              <div className={classes.logoContainer}>
                {/* <VideoLogo /> */}
                <Typography variant="h6" className={classes.title}>
                  Somnoware Video Call
                </Typography>
              </div>
            </div>
            <div className={classes.content}>{props.children}</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default IntroContainer;
  