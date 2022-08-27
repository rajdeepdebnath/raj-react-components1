import { makeStyles, Typography, Grid, Button, Theme, Hidden, CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
    gutterBottom: {
      marginBottom: '1em',
    },
    marginTop: {
      marginTop: '1em',
    },
    deviceButton: {
      width: '100%',
      border: '2px solid #aaa',
      margin: '1em 0',
    },
    localPreviewContainer: {
      paddingRight: '2em',
      [theme.breakpoints.down('sm')]: {
        padding: '0 2.5em',
      },
    },
    joinButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
        width: '100%',
        '& button': {
          margin: '0.5em 0',
        },
      },
    },
    mobileButtonBar: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1.5em 0 1em',
      },
    },
    mobileButton: {
      padding: '0.8em 0',
      margin: 0,
    },
  }));

interface DeviceSelectionScreenProps {
    name: string;
    roomName: string;
  }

  export default function DeviceSelectionScreen({ name, roomName }: DeviceSelectionScreenProps) {
    const classes = useStyles();
    let isFetching = true;
    let isConnecting = false;

    if (isFetching || isConnecting) {
        return (
          <Grid container justifyContent="center" alignItems="center" direction="column" style={{ height: '100%' }}>
            <div>
              <CircularProgress variant="indeterminate" />
            </div>
            <div>
              <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                Joining Meeting
              </Typography>
            </div>
          </Grid>
        );
      }


      
  return (
        <>
        <Typography variant="h5" className={classes.gutterBottom}>
            Join {roomName}
        </Typography>
        </>
    );
  }