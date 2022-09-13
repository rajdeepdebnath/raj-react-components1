import React, { useState, useEffect, FormEvent } from 'react';
import useVideoContext from '../hooks/useVideoContext';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen'
import MediaErrorSnackbar from './MediaErrorSnackbar';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import IntroContainer from '../IntroContainer/IntroContainer'
import { useAppState } from '../../state';



  export default function PreJoinScreens() {
    const { getAudioAndVideoTracks } = useVideoContext();
    const [mediaError, setMediaError] = useState<Error>();

    useEffect(() => {
        getAudioAndVideoTracks().catch(error => {
          console.log('Error acquiring local media:');
          console.dir(error);
          setMediaError(error);
        });
      }, [getAudioAndVideoTracks, mediaError]);

    return (
        <IntroContainer>
            <MediaErrorSnackbar error={mediaError} />
            <DeviceSelectionScreen />
        </IntroContainer>
    );
  }