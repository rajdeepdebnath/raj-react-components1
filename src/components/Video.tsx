import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import UnsupportedBrowserWarning from './UnsupportedBrowserWarning/UnsupportedBrowserWarning'
import LoginPage from './LoginPage/LoginPage'

interface Props{

}

const Video: React.FC<Props> = ({}) => {
    return (
        <UnsupportedBrowserWarning>
            <Routes>
                <Route path="/login" element={<LoginPage />} >
                </Route>
                <Route path="/room" element={<div>Hiiiiii</div>} >
                </Route>
                {/* <Route path="/video/room/:URLRoomName" element={<VideoApp />}>
                </Route>
                <Route path="/video" element={<VideoApp />}>
                </Route> */}
            </Routes>
        </UnsupportedBrowserWarning>
    )
}

export default Video;