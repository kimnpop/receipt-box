import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Tutorial from '/components/login/Tutorial';
import { KAKAO_AUTH_URL } from 'helpers/oauth/kakao';
import apiController from 'helpers/apiController';
import { setCookie } from 'helpers/cookie';
import Link from 'next/link';
import Button from 'components/button/Button';

const Login = () => {
  const router = useRouter();
  const isEmailLogin = router.query.type === 'email';

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoginFetching, setIsLoginFetching] = useState(false);

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleEmailLogin = () => {
    router.push({
      query: { type: 'email' },
    });
  };

  const handleLogin = () => {
    setIsLoginFetching(true);
    apiController()
      .post('/api/auth/login', { username, password })
      .then((res) => {
        const { data } = res;
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        router.push('/');
      })
      .catch(() => {
        alert('아이디나 비밀번호나 없거나 올바르지 않습니다.');
      });
    setIsLoginFetching(false);
  };

  const handlePasswordKeyDown = (e) => {
    if (e.keyCode === 13) handleLogin();
  };

  const renderLoginMain = () => (
    <div className='login-buttons'>
      <button className='login__login-button kakao' onClick={handleKakaoLogin}>
        <img className='kakao-icon' src='icons/kakao.svg' alt='kakao-icon' />
        <span>카카오로 시작하기</span>
      </button>
      <button className='login__login-button normal' onClick={handleEmailLogin}>
        <span>이메일로 시작하기</span>
      </button>
    </div>
  );

  const renderEmailLogin = () => (
    <EmailLoginForm>
      <div className='inputLabel'>
        <input
          type='text'
          placeholder='slowbird@gmail.com'
          id='email'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='email'>이메일</label>
      </div>
      <div className='inputLabel'>
        <input
          type='password'
          placeholder='6자리 이상'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handlePasswordKeyDown}
        />
        <label htmlFor='password'>비밀번호</label>
      </div>
      <Button primary onClick={handleLogin} isLoading={isLoginFetching}>
        로그인
      </Button>
      <Link href='/signup'>
        <div className='sign-up'>회원 가입하기</div>
      </Link>
    </EmailLoginForm>
  );

  return (
    <Container>
      <Tutorial className='login__tutorial' />
      {isEmailLogin ? renderEmailLogin() : renderLoginMain()}
    </Container>
  );
};

export default Login;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 24px 24px 80px 24px;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login__tutorial {
    width: 100%;
    flex: 1;
  }

  .login-buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login__login-button {
    width: 100%;
    max-width: 720px;
    height: 60px;
    margin-bottom: 12px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    :active {
      opacity: 0.6;
    }
  }

  .kakao {
    background: var(--kakao);
    border-color: var(--kakao);
    color: black;
  }

  .normal {
    background: var(--grey100);
    border-color: var(--grey100);
    color: black;
  }

  .kakao-icon {
    position: absolute;
    top: 50%;
    left: 24px;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
  }
`;

const EmailLoginForm = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .inputLabel {
    position: relative;
    width: 100%;
    font-size: 14px;

    label {
      position: absolute;
      top: 8px;
      left: 12px;
      color: var(--grey700);
    }

    input {
      width: 100%;
      height: 60px;
      margin-bottom: 12px;
      border-radius: 16px;
      padding: 24px 12px 0 12px;
      font-size: 15px;
      font-weight: 400;
      border: none;
      border: 1px solid var(--grey400);
      color: var(--grey900);
      font-weight: 300;

      ::placeholder {
        color: var(--grey400);
        font-weight: 300;
      }
    }
  }

  .submit-button {
    width: 100%;
    max-width: 720px;
    height: 60px;
    margin-bottom: 12px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 400;
    background: var(--blue500);
    color: white;
  }

  .sign-up {
    cursor: pointer;
    margin-top: 8px;
    font-size: 14px;
    color: black;
    font-weight: 300;
    text-decoration: underline;
    text-underline-position: under;
  }
`;
