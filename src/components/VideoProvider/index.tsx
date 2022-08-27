import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { CreateLocalTrackOptions, ConnectOptions, LocalAudioTrack, LocalVideoTrack, Room } from 'twilio-video';


export interface IVideoContext {
    room: Room | null;
    // localTracks: (LocalAudioTrack | LocalVideoTrack)[];
    // isConnecting: boolean;
    // connect: (token: string) => Promise<void>;
    // onError: ErrorCallback;
    // getLocalVideoTrack: (newOptions?: CreateLocalTrackOptions) => Promise<LocalVideoTrack>;
    // getLocalAudioTrack: (deviceId?: string) => Promise<LocalAudioTrack>;
    // isAcquiringLocalTracks: boolean;
    // removeLocalVideoTrack: () => void;
    // isSharingScreen: boolean;
    // toggleScreenShare: () => void;
    // getAudioAndVideoTracks: () => Promise<void>;
    // isBackgroundSelectionOpen: boolean;
    // setIsBackgroundSelectionOpen: (value: boolean) => void;
    // backgroundSettings: BackgroundSettings;
    // setBackgroundSettings: (settings: BackgroundSettings) => void;
  }
  
  export const VideoContext = createContext<IVideoContext>(null!);


  
interface VideoProviderProps {
    options?: ConnectOptions;
    onError: ErrorCallback;
    children: ReactNode;
  }
  
  export function VideoProvider({ options, children, onError = () => {} }: VideoProviderProps) {
    const onErrorCallback: ErrorCallback = useCallback(
      error => {
        console.log(`ERROR: ${error.message}`, error);
        onError(error);
      },
      [onError]
    );
  
    // const {
    //   localTracks,
    //   getLocalVideoTrack,
    //   getLocalAudioTrack,
    //   isAcquiringLocalTracks,
    //   removeLocalAudioTrack,
    //   removeLocalVideoTrack,
    //   getAudioAndVideoTracks,
    // } = useLocalTracks();
    // const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options);
    const [room, setRoom] = useState<Room | null>(null);
  
    // const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(room, onError);
  
    // // Register callback functions to be called on room disconnect.
    // useHandleRoomDisconnection(
    //   room,
    //   onError,
    //   removeLocalAudioTrack,
    //   removeLocalVideoTrack,
    //   isSharingScreen,
    //   toggleScreenShare
    // );
    // useHandleTrackPublicationFailed(room, onError);
    // useRestartAudioTrackOnDeviceChange(localTracks);
  
    const [isBackgroundSelectionOpen, setIsBackgroundSelectionOpen] = useState(false);
    // const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video') as
    //   | LocalVideoTrack
    //   | undefined;
    // const [backgroundSettings, setBackgroundSettings] = useBackgroundSettings(videoTrack, room);
    
  
    return (
      <VideoContext.Provider
        value={{
          room,
        //   localTracks,
        //   isConnecting,
        //   onError: onErrorCallback,
        //   getLocalVideoTrack,
        //   getLocalAudioTrack,
        //   connect,
        //   isAcquiringLocalTracks,
        //   removeLocalVideoTrack,
        //   isSharingScreen,
        //   toggleScreenShare,
        //   getAudioAndVideoTracks,
        //   isBackgroundSelectionOpen,
        //   setIsBackgroundSelectionOpen,
        //   backgroundSettings,
        //   setBackgroundSettings,
        }}
      >
        {/* <SelectedParticipantProvider room={room}>{children}</SelectedParticipantProvider> */}
        {children}
        {/* 
          The AttachVisibilityHandler component is using the useLocalVideoToggle hook
          which must be used within the VideoContext Provider.
        */}
        {/* <AttachVisibilityHandler /> */}
      </VideoContext.Provider>
    );
  }