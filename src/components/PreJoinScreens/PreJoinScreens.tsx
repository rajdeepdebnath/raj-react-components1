import React, { useState, useEffect, FormEvent } from 'react';
import useVideoContext from '../hooks/useVideoContext';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen'
import MediaErrorSnackbar from './MediaErrorSnackbar';



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
            <DeviceSelectionScreen name={name} roomName={roomName} />
        </div>
    );
  }