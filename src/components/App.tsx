import React from 'react';
import { styled, Theme } from '@material-ui/core/styles';


const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: '1fr auto',
  });


  
export default function App() {
  
    return (
      <Container style={{ height:'80vh' }}>
        <div>welcomeeeee</div>
      </Container>
    );
  }