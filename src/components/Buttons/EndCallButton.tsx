import React, { useCallback } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

import useVideoContext from '../hooks/useVideoContext';
import { useAppState } from '../../state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      '&:hover': {
        color: 'white',
        background: '#600101',
      },
    },
    buttonDisconnect: {
      background: theme.brand2
    },
    buttonEndCall: {
      marginLeft:'10px'
    },
  })
);

export default function EndCallButton(props: { className?: string }) {
  const classes = useStyles();
  const { room } = useVideoContext();
  const { completeRoom, isHost } = useAppState();

  const endCallFn = useCallback(() => {
    if(confirm('Are you sure you want to END the call?')){
      completeRoom(room!.sid);
    }
  }, []);

  const disconnectFn = useCallback(() => {
    if(confirm('Are you sure you want to disconnect?')){
      room!.disconnect();
    }
  }, []);

  return (
      isHost 
        ? 
      <Button onClick={endCallFn} variant="outlined" color="secondary" className={classes.button}>
        End call
      </Button>
        :
      <Button onClick={disconnectFn} variant="outlined" color="secondary" className={classes.button}>
        Disconnect
      </Button>
  );
}
