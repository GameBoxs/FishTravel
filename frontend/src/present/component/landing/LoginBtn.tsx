import imgLink from '../../../assets/login/kakao_button.png';
import * as Style from './LoginBtn.Styled';


const LoginBtn = () => {
  const kakaoLoginUrl = `http://localhost:8080/api/oauth2/authorization/kakao`;

  return (
    <Style.LoginBtnWrapper>
      <a href={kakaoLoginUrl}>
        <img className="kakao-img" src={imgLink} />
      </a>
    </Style.LoginBtnWrapper>
  );
};

export default LoginBtn;
