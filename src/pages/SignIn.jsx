import React from "react";
import useInput from "../hooks/useInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { InputBox } from "./SignUp";
import { useMutation } from "react-query";
import { signIn } from "../api/users";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/modules/currentuser";
import Authorization from "../components/Authorization";

function SignIn() {
  const [id, onChangeIdHandler, setId] = useInput();
  const [pw, onChangePwHandler, setPw] = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((user) => user.currentuser);

  const mutation = useMutation(signIn, {
    onSuccess: (data) => {
      const token = data.token; // toekn 받음
      // 쿠키 저장, 유효시간 설정
      // document.cookie = `token=${token}; max-age=600`;
      document.cookie = `token=${token};`;

      alert("로그인 되었습니다!");
      navigate("/");
    },
    onError: (error) => {
      if (error.response.status === 401) {
        return alert(error.response.data.message);
      }
      return alert(error.message);
    },
  });

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    if (!id.trim()) {
      return alert("id를 입력해주세요!");
    } else if (!pw.trim()) {
      return alert("pw를 입력해주세요!");
    }
    const user = {
      id: id,
      password: pw,
    };

    mutation.mutate(user);
    dispatch(loginUser(user.id));
  };

  return (
    <div>
      <Header />
      <Authorization />
      <SigninWrapper>
        <h1>로그인</h1>
        <SigninBox onSubmit={(e) => loginSubmitHandler(e)}>
          <InputBox
            value={id}
            onChange={onChangeIdHandler}
            placeholder="아이디"
          />
          <InputBox
            value={pw}
            onChange={onChangePwHandler}
            type="password"
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
