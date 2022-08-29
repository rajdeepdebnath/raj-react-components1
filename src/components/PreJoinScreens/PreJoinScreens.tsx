import React, { useState, useEffect, FormEvent } from 'react';
import useVideoContext from '../hooks/useVideoContext';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen'
import MediaErrorSnackbar from './MediaErrorSnackbar';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';



  export default function PreJoinScreens() {
    const { getAudioAndVideoTracks } = useVideoContext();
    const [mediaError, setMediaError] = useState<Error>();
    let name = 'Rajdeep';
    let roomName = 'Rajdeep';

    useEffect(() => {
        getAudioAndVideoTracks().catch(error => {
          console.log('Error acquiring local media:');
          console.dir(error);
          setMediaError(error);
        });
      }, [getAudioAndVideoTracks, mediaError]);

    return (
        <div>
            <MediaErrorSnackbar error={mediaError} />
            <p>PreJoinScreens:</p>
            <Hidden mdDown>
                <Paper>Small Down</Paper>
            </Hidden>
            <DeviceSelectionScreen name={name} roomName={roomName} />
        </div>
    );
  }