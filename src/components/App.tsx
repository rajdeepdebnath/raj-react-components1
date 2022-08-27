import React from 'react';
import { styled, Theme } from '@material-ui/core/styles';
import useHeight from './hooks/useHeight';


const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: '1fr auto',
  });


  
export default function App() {
  
    const height = useHeight();

    return (
      <Container style={{ height, backgroundColor:'green' }}>
        <div>welcomeeeee</div>
      </Container>
    );
  }