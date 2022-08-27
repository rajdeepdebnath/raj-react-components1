import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import UnsupportedBrowserWarning from './UnsupportedBrowserWarning/UnsupportedBrowserWarning'
import LoginPage from './LoginPage/LoginPage'
import App from './App'
import { VideoProvider } from './VideoProvider';
import theme from '../theme'

interface Props{

}

const Video: React.FC<Props> = ({}) => {

    const setError = (e) => console.error(e);
    const connectionOptions = undefined;
    
    return (
        <MuiThemeProvider theme={theme}>
            <UnsupportedBrowserWarning>
                <VideoProvider options={connectionOptions} onError={setError}>
                    <App />
                </VideoProvider>
                {/* <Routes>
                    <Route path="/login" element={<LoginPage />} >
                    </Route>
                    <Route path="/room" element={<div>Hiiiiii12345</div>} >
                    </Route>
                    <Route path="/video" element={<App />} >
                    </Route>
                </Routes> */}
            </UnsupportedBrowserWarning>
        </MuiThemeProvider>
    )
}

export default Video;