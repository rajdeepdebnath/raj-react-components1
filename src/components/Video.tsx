import React from 'react'

import UnsupportedBrowserWarning from './UnsupportedBrowserWarning/UnsupportedBrowserWarning'

interface Props{

}

const Video: React.FC<Props> = ({}) => {
    return (
        <UnsupportedBrowserWarning>
            <div>Video</div>
        </UnsupportedBrowserWarning>
    )
}

export default Video;