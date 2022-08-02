import React from 'react';
import Video from 'twilio-video';

export default function UnsupportedBrowserWarning({ children }: { children: React.ReactElement }) {

    if (!Video.isSupported) {
        return (
            <div>{children}</div>
        );
    }
    else{ 
        return (
            <div>{Video.isSupported ? 'supported' : 'unsupported'}</div>
        )
    }
}