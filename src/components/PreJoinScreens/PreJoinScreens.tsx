import React, { useState, useEffect, FormEvent } from 'react';
import useVideoContext from '../hooks/useVideoContext';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen'



  export default function PreJoinScreens() {
    const { getAudioAndVideoTracks } = useVideoContext();
    let name = 'Rajdeep';
    let roomName = 'Rajdeep';

    return (
        <div>
            <p>PreJoinScreens:</p>
            <DeviceSelectionScreen name={name} roomName={roomName} />
        </div>
    );
  }