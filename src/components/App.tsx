import React from 'react';
import { styled, Theme } from '@material-ui/core/styles';
import useHeight from './hooks/useHeight';
import useRoomState from './hooks/useRoomState';
import PreJoinScreens from './PreJoinScreens/PreJoinScreens';
import MobileTopMenuBar from './MobileTopMenuBar';
import MenuBar from './MenuBar';


const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: '1fr auto',
  });

  const Main = styled('main')(({ theme }: { theme: Theme }) => ({
    overflow: 'hidden',
    paddingBottom: `${theme.footerHeight}px`, // Leave some space for the footer
    background: 'black',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: `${theme.mobileFooterHeight + theme.mobileTopBarHeight}px`, // Leave some space for the mobile header and footer
    },
  }));


  
export default function App() {
  
    const roomState = useRoomState();
    const height = useHeight();

    return (
        <Container style={{ height, backgroundColor:'green' }}>
            {roomState === 'disconnected' ? <PreJoinScreens />
            :
            (<Main>
              <MobileTopMenuBar />
              <MenuBar />
            </Main>)}
        </Container>
    );
  }