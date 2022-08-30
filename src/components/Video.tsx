import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import UnsupportedBrowserWarning from './UnsupportedBrowserWarning/UnsupportedBrowserWarning'
import LoginPage from './LoginPage/LoginPage'
import AppStateProvider, { useAppState } from '../state';
import App from './App'
import { VideoProvider } from './VideoProvider';
import theme from '../theme'

interface Props{

}

function VideoProviderWrapper(){

    //const setError = (e) => console.error(e);
    const connectionOptions = undefined;
    const { error, setError } = useAppState();
    
    return (
        <VideoProvider options={connectionOptions} onError={setError}>
            <App />
        </VideoProvider>
    );
}

const Video: React.FC<Props> = ({}) => {
    
    return (
        <MuiThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <UnsupportedBrowserWarning>
                <AppStateProvider>
                    <VideoProviderWrapper />
                </AppStateProvider>
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