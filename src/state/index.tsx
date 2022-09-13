import React, { createContext, useContext, useReducer, useState } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { RecordingRules, RoomType } from '../types';
import { TwilioError } from 'twilio-video';
import { settingsReducer, initialSettings, Settings, SettingsAction } from './settingsReducer';
import { useLocalStorageState } from '../components/hooks/useLocalStorageState';
import useActiveSinkId from '../components/hooks/useActiveSinkId';

export interface StateContextType {
  error: TwilioError | Error | null;
  setError(error: TwilioError | Error | null): void;
  getToken(): Promise<{ room_type:string, token: string }>;
  completeRoom(room_sid:string): Promise<void>;
  user?: null | { displayName: undefined; photoURL: undefined; passcode?: string };
  signIn?(passcode?: string): Promise<void>;
  signOut?(): Promise<void>;
  isAuthReady?: boolean;
  isFetching: boolean;
  activeSinkId: string;
  setActiveSinkId(sinkId: string): void;
  settings: Settings;
  dispatchSetting: React.Dispatch<SettingsAction>;
  roomType?: RoomType;
  setRoomType: React.Dispatch<React.SetStateAction<RoomType>>;
  updateRecordingRules(room_sid: string, rules: RecordingRules): Promise<object>;
  isGalleryViewActive: boolean;
  setIsGalleryViewActive: React.Dispatch<React.SetStateAction<boolean>>;
  maxGalleryViewParticipants: number;
  setMaxGalleryViewParticipants: React.Dispatch<React.SetStateAction<number>>;
  roomName?:string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  roomDisplayName?:string;
  setRoomDisplayName: React.Dispatch<React.SetStateAction<string>>;
  participantName?:string;
  setParticipantName: React.Dispatch<React.SetStateAction<string>>;
  isHost?:boolean;
  setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
  isConnected?:boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  isCompleting?:boolean;
  setIsCompleting: React.Dispatch<React.SetStateAction<boolean>>;
  isCompleted?:boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateContext = createContext<StateContextType>(null!);


export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [error, setError] = useState<TwilioError | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isGalleryViewActive, setIsGalleryViewActive] = useLocalStorageState('gallery-view-active-key', true);
  const [activeSinkId, setActiveSinkId] = useActiveSinkId();
  const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);
  const [roomType, setRoomType] = useState<string>();
  const [roomName, setRoomName] = useState<string>();
  const [roomDisplayName, setRoomDisplayName] = useState<string>();
  const [participantName, setParticipantName] = useState<string>();
  const [isHost, setIsHost] = useState<boolean>();
  const [isConnected, setIsConnected] = useState<boolean>();
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [maxGalleryViewParticipants, setMaxGalleryViewParticipants] = useLocalStorageState(
    'max-gallery-participants-key',
    6
  );

  let contextValue = {
    error,
    setError,
    isFetching,
    activeSinkId,
    setActiveSinkId,
    settings,
    dispatchSetting,
    roomType,
    setRoomType,
    isGalleryViewActive,
    setIsGalleryViewActive,
    maxGalleryViewParticipants,
    setMaxGalleryViewParticipants,
    roomName,
    setRoomName,
    roomDisplayName,
    setRoomDisplayName,
    participantName,
    setParticipantName,
    isHost,
    setIsHost,
    isConnected,
    setIsConnected,
    isCompleting,
    setIsCompleting,
    isCompleted,
    setIsCompleted,
  } as StateContextType;

  contextValue = {
    ...contextValue,
    getToken: async () => {
      const body = {
        user_identity:participantName,
        room_name:roomName,
        room_type:roomType,
        create_room:isHost,
        create_conversation: process.env.DISABLE_VIDEO_CALL_CONVERSATIONS !== 'true',
      };
      const headers = {
        'content-type': 'application/json',
      };

      //TODO: uncomment this code and read token api url from env file
      // const token_url = process.env.TOKEN_API_URL ?? '/token';
      // console.log(token_url);

      const response = await axios.post(
        'https://cm2-twilio-video-poc-5184-dev.twil.io/token',
        body,{
          headers: headers
        }
      );

      console.log(response);
      const data = response.data;

      return data;
    },
    completeRoom: async (room_sid) => {
      const body = {
        room_sid
      };
      const headers = {
        'content-type': 'application/json',
      };

      const response = await axios.post(
        'https://cm2-twilio-video-poc-5184-dev.twil.io/complete-room',
        body,{
          headers: headers
        }
      );

      return;
    },
    updateRecordingRules: async (room_sid, rules) => {
      const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

      return fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room_sid, rules }),
        method: 'POST',
      })
        .then(async res => {
          const jsonResponse = await res.json();

          if (!res.ok) {
            const recordingError = new Error(
              jsonResponse.error?.message || 'There was an error updating recording rules'
            );
            recordingError.code = jsonResponse.error?.code;
            return Promise.reject(recordingError);
          }

          return jsonResponse;
        })
        .catch(err => setError(err));
    },
  };

  const getToken: StateContextType['getToken'] = () => {
    setIsFetching(true);
    return contextValue
      .getToken()
      .then(res => {
        setIsConnected(true);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const completeRoom: StateContextType['completeRoom'] = (room_sid) => {
    setIsCompleting(true);
    return contextValue
      .completeRoom(room_sid)
      .then(res => {
        setIsCompleting(false);
        setIsCompleted(true);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsCompleting(false);
        return Promise.reject(err);
      });
  };

  const updateRecordingRules: StateContextType['updateRecordingRules'] = (room_sid, rules) => {
    setIsFetching(true);
    return contextValue
      .updateRecordingRules(room_sid, rules)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  return (
    <StateContext.Provider value={{ ...contextValue, getToken, completeRoom, updateRecordingRules }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
