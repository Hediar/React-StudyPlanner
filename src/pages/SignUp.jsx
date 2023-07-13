import React from "react";
import Button from "../components/Button";
import useInput from "../hooks/useInput";
import { styled } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMutation } from "react-query";
import { signUp } from "../api/users";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [id, onChangeIdHandler, setId] = useInput();
  const [pw, onChangePwHandler, setPw] = useInput();

  const navigate = useNavigate();
  const mutation = useMutation(signUp, {
    onSuccess: () => {
      alert("회원가입 되었습니다!");
      navigate("/signin");
      return;
    },
    onError: (error) => {
      if (error.response.status === 401) {
        return alert(error.response.data.message);
      }
      return alert(error.message);
    },
  });

  const signUpButtonHandler = () => {
    if (!id.trim()) {
      return alert("id를 입력해주세요!");
    } else if (!pw.trim()) {
      return alert("pw를 입력해주세요!");
    }
    const newUser = {
      id: id,
      password: pw,
    };
    mutation.mutate(newUser);
  };
  return (
    <div>
      <Header />
      <SignupWrapper>
        <h1>회원가입</h1>
        <SignupBox>
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
          <Button onClick={signUpButtonHandler}>회원가입</Button>
        </SignupBox>
      </SignupWrapper>
      <Footer />
    </div>
  );
}

export default SignUp;
const SignupWrapper = styled.div`
  padding: 20px;
  box-sizing: border-box;
  width: 460px;
  margin: 0 auto;
`;

const SignupBox = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 5px 8px 0 rgba(68, 68, 68, 0.04);
`;

export const InputBox = styled.input`
  padding: 10px;
  margin: 10px;
  outline: none;
  border: 1px solid #c6c6c6;
  margin-bottom: 10px;
  border-radius: 4px;
`;
