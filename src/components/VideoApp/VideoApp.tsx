import React from 'react';
import ReactDOM from 'react-dom';

import { useAppState } from '../../state';
import useConnectionOptions from './useConnectionOptions'
import { VideoProvider } from './VideoProvider'
import ErrorDialog from '../ErrorDialog/ErrorDialog';
import { ParticipantProvider } from '../ParticipantProvider';
import { ChatProvider } from '../ChatProvider';


const VideoApp = () => {
    const { error, setError } = useAppState();
    const connectionOptions = useConnectionOptions();
  
    return (
      <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      <ParticipantProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ParticipantProvider>
    </VideoProvider>
    );
  };


  export default VideoApp;