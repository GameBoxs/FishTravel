import imgLink from '../../../assets/login/kakao_button.png';
import * as Style from './LoginBtn.Styled';


const LoginBtn = () => {
  const kakaoLoginUrl = `https://k8d205.p.ssafy.io/api/oauth2/authorization/kakao`;

  return (
    <Style.LoginBtnWrapper>
      <a href={kakaoLoginUrl}>
        <img className="kakao-img" src={imgLink} />
      </a>
    </Style.LoginBtnWrapper>
  );
};

export default LoginBtn;
