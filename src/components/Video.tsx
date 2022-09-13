import React, { useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { v4 as uuidv4 } from "uuid";
import { CssBaseline } from '@material-ui/core';
import UnsupportedBrowserWarning from './UnsupportedBrowserWarning/UnsupportedBrowserWarning'
import LoginPage from './LoginPage/LoginPage'
import AppStateProvider, { useAppState } from '../state';
import { Callback, RoomType } from '../types';
import App from './App'
import { VideoProvider } from './VideoProvider';
import theme from '../theme'
import useConnectionOptions from '../utils/useConnectionOptions'
import { ParticipantProvider } from './ParticipantProvider';

interface Props{
    participantName:string,
    roomName:string,
    roomDisplayName:string,
    isHost:boolean,
    roomIsConnectedByHost: Callback
}

function VideoProviderWrapper({ participantName, roomName, roomDisplayName, isHost, roomIsConnectedByHost}){

    const connectionOptions = useConnectionOptions();
    const { error, isConnected, setError, setRoomName, setIsHost
        , setRoomType, setParticipantName, setRoomDisplayName } = useAppState();

    useEffect(() => {
        //In twilio video call room gets created based on room name. 
        //room name must be unique between 2 separate video calls
        setRoomName(roomName);
        setRoomDisplayName(roomDisplayName);
        setParticipantName(participantName);
        setIsHost(isHost);
        setRoomType(process.env.REACT_APP_ROOM_TYPE as RoomType);
    }, []);
    
    useEffect(() => {
        if(isConnected){
            roomIsConnectedByHost(true);
        }
    }, [isConnected]);
    
    useEffect(() => {
        if(error){
            roomIsConnectedByHost(false, error);
        }
    }, [error]);
    
    return (
        <VideoProvider options={connectionOptions} onError={setError}>
            <ParticipantProvider>
                <App />
            </ParticipantProvider>
        </VideoProvider>
    );
}

const Video: React.FC<Props> = (props) => {
    
    return (
        <MuiThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <UnsupportedBrowserWarning>
                <AppStateProvider>
                    <VideoProviderWrapper {...props} />
                </AppStateProvider>
            </UnsupportedBrowserWarning>
        </MuiThemeProvider>
    )
}

export default Video;