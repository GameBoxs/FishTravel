import React from 'react';
import { Routes } from 'react-router';
import { Route, Outlet } from 'react-router-dom';
import { MultiGamePage } from './present/pages/MultiGamePage';
import SingleGamePage from './present/pages/SingleGamePage';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" />
        <Route path="/game" element={<Outlet />}>
          <Route index />
          <Route path="single" element={<SingleGamePage />} />
          <Route path="multi" element={<MultiGamePage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
