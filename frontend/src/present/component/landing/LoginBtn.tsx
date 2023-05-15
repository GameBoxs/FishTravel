import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import imgLink from '../../../assets/login/kakao_button.png';
import * as Style from './LoginBtn.Styled';
import axios from 'axios';
import { useUserStore } from '../../../store/userStore';

const LoginBtn = () => {
  const navigate = useNavigate();
  const kakaoLoginUrl = `http://localhost:8080/api/oauth2/authorization/kakao`;
  let isLogin = useUserStore((state) => state.isLogin);
  let setIsLogin = useUserStore((state) => state.setIsLogin);
  let userId = useUserStore((state) => state.userId);
  let setUserId = useUserStore((state) => state.setUserId);
  // let profileImage = useUserStore((state) => state.profileImage);
  // let setProfileImage = useUserStore((state) => state.setProfileImage);
  let name = useUserStore((state) => state.name);
  let setName = useUserStore((state) => state.setName);

  useEffect(() => {
    if (isLogin) {
      navigate('/mainlobby');
      console.log(isLogin);
    }
  }, [isLogin]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/info', {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data); // 응답 데이터를 콘솔에 출력합니다.
        setIsLogin(true);
        setUserId(response.data.loginId);
        setName(response.data.name);
      })
      .catch((error) => {
        console.error(error); // 오류가 발생하면 콘솔에 출력합니다.
      });
  }, []); // 컴포넌트가 마운트될 때만 실행합니다.

  return (
    <Style.LoginBtnWrapper>
      <a href={kakaoLoginUrl}>
        <img className="kakao-img" src={imgLink} />
      </a>
    </Style.LoginBtnWrapper>
  );
};

export default LoginBtn;
