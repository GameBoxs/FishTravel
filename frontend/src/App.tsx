import React from 'react';
import { Routes } from 'react-router';
import { Route, Outlet } from 'react-router-dom';
import * as Styled from './App.Styled';
import SingleGamePage from './present/pages/SingleGamePage';

function App() {
  return (
    <Styled.AppWrapper>
      <Routes>
        <Route path="/" />
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
