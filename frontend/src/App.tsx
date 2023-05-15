import React from 'react';
import { Routes } from 'react-router';
import { Route, Outlet } from 'react-router-dom';
import * as Styled from './App.Styled';
import SingleGamePage from './present/pages/SingleGamePage';
import GlobalStyle from './action/GlobalStyle';
import LandingPage from './present/pages/LandingPage';
import MainLobbyPage from './present/pages/MainLobbyPage';

function App() {
  return (
    <Styled.AppWrapper>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/mainlobby" element={<MainLobbyPage />}></Route>
        <Route path="/game" element={<Outlet />}>
          <Route index />
          <Route path="single" element={<SingleGamePage />} />
          <Route path="multi" />
        </Route>
      </Routes>
    </Styled.AppWrapper>
  );
}

export default App;
