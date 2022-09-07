import React, { useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import UnsupportedBrowserWarning from './UnsupportedBrowserWarning/UnsupportedBrowserWarning'
import LoginPage from './LoginPage/LoginPage'
import AppStateProvider, { useAppState } from '../state';
import App from './App'
import { VideoProvider } from './VideoProvider';
import theme from '../theme'
import useConnectionOptions from '../utils/useConnectionOptions'

interface Props{
    roomName:string
}

function VideoProviderWrapper({ roomName }){

    const connectionOptions = useConnectionOptions();
    const { error, setError, setRoomName } = useAppState();

    useEffect(() => {
        setRoomName(roomName);
    }, [])
    
    return (
        <VideoProvider options={connectionOptions} onError={setError}>
            <App />
        </VideoProvider>
    );
}

const Video: React.FC<Props> = ({ roomName }) => {
    
    return (
        <MuiThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <UnsupportedBrowserWarning>
                <AppStateProvider>
                    <VideoProviderWrapper roomName={roomName} />
                </AppStateProvider>
            </UnsupportedBrowserWarning>
        </MuiThemeProvider>
    )
}

export default Video;