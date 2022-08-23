import { ConnectOptions } from 'twilio-video';
import { useAppState } from '../../state';
import { isPlainObject } from 'is-plain-object';

export const isMobile = (() => {
    if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
      return false;
    }
    return /Mobile/.test(navigator.userAgent);
  })();

  // Recursively removes any object keys with a value of undefined
export function removeUndefineds<T>(obj: T): T {
    if (!isPlainObject(obj)) return obj;
  
    const target: { [name: string]: any } = {};
  
    for (const key in obj) {
      const val = obj[key];
      if (typeof val !== 'undefined') {
        target[key] = removeUndefineds(val);
      }
    }
  
    return target as T;
  }

export default function useConnectionOptions() {
  const { settings } = useAppState();

  // See: https://sdk.twilio.com/js/video/releases/2.0.0/docs/global.html#ConnectOptions
  // for available connection options.
  const connectionOptions: ConnectOptions = {
    // Bandwidth Profile, Dominant Speaker, and Network Quality
    // features are only available in Small Group or Group Rooms.
    // Please set "Room Type" to "Group" or "Small Group" in your
    // Twilio Console: https://www.twilio.com/console/video/configure
    bandwidthProfile: {
      video: {
        mode: settings.bandwidthProfileMode,
        dominantSpeakerPriority: settings.dominantSpeakerPriority,
        trackSwitchOffMode: settings.trackSwitchOffMode,
        contentPreferencesMode: settings.contentPreferencesMode,
        clientTrackSwitchOffControl: settings.clientTrackSwitchOffControl,
      },
    },
    dominantSpeaker: true,
    networkQuality: { local: 1, remote: 1 },

    // Comment this line if you are playing music.
    maxAudioBitrate: Number(settings.maxAudioBitrate),

    preferredVideoCodecs: 'auto',

    //@ts-ignore - Internal use only. This property is not exposed in type definitions.
    environment: process.env.REACT_APP_TWILIO_ENVIRONMENT,
  };

  // For mobile browsers, limit the maximum incoming video bitrate to 2.5 Mbps.
  if (isMobile && connectionOptions?.bandwidthProfile?.video) {
    connectionOptions!.bandwidthProfile!.video!.maxSubscriptionBitrate = 2500000;
  }

  if (process.env.REACT_APP_TWILIO_ENVIRONMENT === 'dev') {
    //@ts-ignore - Internal use only. This property is not exposed in type definitions.
    connectionOptions!.wsServer = 'wss://us2.vss.dev.twilio.com/signaling';
  }

  // Here we remove any 'undefined' values. The twilio-video SDK will only use defaults
  // when no value is passed for an option. It will throw an error when 'undefined' is passed.
  return removeUndefineds(connectionOptions);
}


export async function getDeviceInfo() {
    const devices = await navigator.mediaDevices.enumerateDevices();
  
    return {
      audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
      videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
      audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
      hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
      hasVideoInputDevices: devices.some(device => device.kind === 'videoinput'),
    };
  }
  
  // This function will return 'true' when the specified permission has been denied by the user.
  // If the API doesn't exist, or the query function returns an error, 'false' will be returned.
  export async function isPermissionDenied(name: 'camera' | 'microphone') {
    const permissionName = name as PermissionName; // workaround for https://github.com/microsoft/TypeScript/issues/33923
  
    if (navigator.permissions) {
      try {
        const result = await navigator.permissions.query({ name: permissionName });
        return result.state === 'denied';
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }
