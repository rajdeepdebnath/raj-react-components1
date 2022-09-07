import React, { createContext, useContext, useReducer, useState } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { RecordingRules, RoomType } from '../types';
import { TwilioError } from 'twilio-video';
import { settingsReducer, initialSettings, Settings, SettingsAction } from './settingsReducer';
import { useLocalStorageState } from '../components/hooks/useLocalStorageState';

export interface StateContextType {
  error: TwilioError | Error | null;
  setError(error: TwilioError | Error | null): void;
  getToken(name: string, room: string, passcode?: string): Promise<{ room_type:string, accessToken: string }>;
  user?: null | { displayName: undefined; photoURL: undefined; passcode?: string };
  signIn?(passcode?: string): Promise<void>;
  signOut?(): Promise<void>;
  isAuthReady?: boolean;
  isFetching: boolean;
  settings: Settings;
  dispatchSetting: React.Dispatch<SettingsAction>;
  roomType?: RoomType;
  updateRecordingRules(room_sid: string, rules: RecordingRules): Promise<object>;
  isGalleryViewActive: boolean;
  setIsGalleryViewActive: React.Dispatch<React.SetStateAction<boolean>>;
  maxGalleryViewParticipants: number;
  setMaxGalleryViewParticipants: React.Dispatch<React.SetStateAction<number>>;
  roomName?:string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
}

export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks from being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [error, setError] = useState<TwilioError | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isGalleryViewActive, setIsGalleryViewActive] = useLocalStorageState('gallery-view-active-key', true);
  const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);
  const [roomType, setRoomType] = useState<string>();
  const [roomName, setRoomName] = useState<string>();
  const [maxGalleryViewParticipants, setMaxGalleryViewParticipants] = useLocalStorageState(
    'max-gallery-participants-key',
    6
  );

  let contextValue = {
    error,
    setError,
    isFetching,
    settings,
    dispatchSetting,
    roomType,
    isGalleryViewActive,
    setIsGalleryViewActive,
    maxGalleryViewParticipants,
    setMaxGalleryViewParticipants,
    roomName,
    setRoomName
  } as StateContextType;

  contextValue = {
    ...contextValue,
    getToken: async (user_name, room_name) => {
      // const endpoint = process.env.VIDEO_CALL_TOKEN_ENDPOINT || '/token';

      // return fetch(endpoint, {
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user_identity,
      //     room_name,
      //     create_conversation: process.env.DISABLE_VIDEO_CALL_CONVERSATIONS !== 'true',
      //   }),
      // }).then(res => res.json());
      const user_identity = `${user_name}${room_name}-${uuidv4()}`;

      const response = await axios.get(
        `https://cm2-twilio-video-poc-5184-dev.twil.io/token-service?identity=${user_identity}`
      );

      console.log(response);
      const data = response.data;

      data.room_type = process.env.ROOM_TYPE;
      return data;
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

  const getToken: StateContextType['getToken'] = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then(res => {
        setRoomType(res.room_type);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
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
    <StateContext.Provider value={{ ...contextValue, getToken, updateRecordingRules }}>
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
