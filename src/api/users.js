import axios from "axios";
import aut from "./aut";

// 회원가입
const signUp = async (user) => {
  const response = await axios.post(
    `${process.env.REACT_APP_AUTAPI_URL}register`,
    user
  );
  return;
};

// 로그인
const signIn = async (user) => {
  const response = await axios.post(
    `${process.env.REACT_APP_AUTAPI_URL}login`,
    user
  );
  return response.data;
};

// 유저 인증 확인
const checkAut = async (token) => {
  const response = await aut.get("user", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { signUp, signIn, checkAut };
