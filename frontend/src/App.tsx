import React from 'react';
import { Routes } from 'react-router';
import { Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/game" element={<Outlet />}>
        <Route index />
        <Route path="/single" />
        <Route path="/multi" />
      </Route>
    </Routes>
  );
}

export default App;
