import React, { useEffect } from 'react';
import { Routes } from 'react-router';
import { Route, Outlet } from 'react-router-dom';
import * as Styled from './App.Styled';
import SingleGamePage from './present/pages/SingleGamePage';
import GlobalStyle from './action/GlobalStyle';
import LandingPage from './present/pages/LandingPage';
import MainLobbyPage from './present/pages/MainLobbyPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from './store/userStore';
import GameLobbyPage from './present/pages/GameLobbyPage';

function App() {
  const navigate = useNavigate();
  let isLogin = useUserStore((state) => state.isLogin);
  let setIsLogin = useUserStore((state) => state.setIsLogin);
  let id = useUserStore((state) => state.id);
  let setId = useUserStore((state) => state.setId);
  // let profileImage = useUserStore((state) => state.profileImage);
  // let setProfileImage = useUserStore((state) => state.setProfileImage);
  let name = useUserStore((state) => state.name);
  let setName = useUserStore((state) => state.setName);

  // useEffect(() => {
  //   if (isLogin) {
  //     navigate('/mainlobby');
  //     console.log(isLogin);
  //   }
  // }, [isLogin]);

  useEffect(() => {
    if (id == null && isLogin == false && name == null) {
      axios
        .get('http://localhost:8080/api/info', {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data); // 응답 데이터를 콘솔에 출력합니다.
          setIsLogin(true);
          setId(response.data.id);
          setName(response.data.name);
        })
        .catch((error) => {
          console.error(error); // 오류가 발생하면 콘솔에 출력합니다.
        });
    }
  }, []); // 컴포넌트가 마운트될 때만 실행합니다.

  return (
    <Styled.AppWrapper>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/mainlobby" element={<MainLobbyPage />}></Route>
        <Route path="/gamelobby" element={<GameLobbyPage />}></Route>
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
