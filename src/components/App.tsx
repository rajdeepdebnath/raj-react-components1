import React from 'react';
import { styled, Theme } from '@material-ui/core/styles';
import useHeight from './hooks/useHeight';
import useRoomState from './hooks/useRoomState';


const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: '1fr auto',
  });


  
export default function App() {
  
    const roomState = useRoomState();
    const height = useHeight();

    return (
        <Container style={{ height, backgroundColor:'green' }}>
            {roomState === 'disconnected' ? (<div>disconnected11</div>)
            :
            (<div>connected11</div>)}
            <div>welcomeeeee</div>
        </Container>
    );
  }