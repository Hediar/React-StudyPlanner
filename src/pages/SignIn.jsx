import React from "react";
import useInput from "../hooks/useInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { InputBox } from "./SignUp";

function SignIn() {
  const [id, onChangeIdHandler, setId] = useInput();
  const [pw, onChangePwHandler, setPw] = useInput();
  const navigate = useNavigate();
  const loginSubmitHandler = () => {
    console.log("로그인!");
  };

  return (
    <div>
      <Header />
      <SigninWrapper>
        <h1>로그인</h1>
        <SigninBox onSubmit={loginSubmitHandler}>
          <InputBox
            value={id}
            onChange={onChangeIdHandler}
            placeholder="아이디"
          />
          <InputBox
            value={pw}
            onChange={onChangePwHandler}
            placeholder="비밀번호"
          />

          <Button>로그인</Button>
        </SigninBox>
        <Button onClick={() => navigate("/signup")}>회원가입</Button>
      </SigninWrapper>
      <Footer />
    </div>
  );
}

export default SignIn;

const SigninWrapper = styled.div`
  padding: 20px;
  box-sizing: border-box;
  width: 460px;
  margin: 0 auto;
`;

const SigninBox = styled.form`
  border: 1px solid #c6c6c6;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 5px 8px 0 rgba(68, 68, 68, 0.04);
`;
