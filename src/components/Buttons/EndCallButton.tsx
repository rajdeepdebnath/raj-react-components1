import React, { useCallback } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

import useVideoContext from '../hooks/useVideoContext';
import { useAppState } from '../../state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: theme.brand,
      color: 'white',
      '&:hover': {
        background: '#600101',
      },
    },
  })
);

export default function EndCallButton(props: { className?: string }) {
  const classes = useStyles();
  const { room } = useVideoContext();
  const { completeRoom } = useAppState();

  const endCallFn = useCallback(() => {
    if(confirm('Are you sure you want to END the call?')){
      completeRoom(room!.sid);
    }
  }, []);

  return (
    <>
      <Button onClick={() => room!.disconnect()} className={clsx(classes.button, props.className)}>
        Disconnect
      </Button>
      <Button onClick={endCallFn} className={clsx(classes.button, props.className)}>
        End call
      </Button>
    </>
  );
}
