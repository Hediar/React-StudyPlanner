import axios from "axios";

// 회원가입
const signUp = async (user) => {
  const response = await axios.post(
    `${process.env.REACT_APP_AUTAPI_URL}register`,
    user
  );
  //   console.log("회원가입", response);
  return;
};

// 로그인
const signIn = async (user) => {
  const response = await axios.post(
    `${process.env.REACT_APP_AUTAPI_URL}login`,
    user
  );
  console.log("로그인", response.data);
  return;
};

// 유저 인증 확인
const checkAut = async () => {
  // 쿠키가 있고, 해당 쿠키를 인증해야 함

  const response = await axios.get(`${process.env.REACT_APP_AUTAPI_URL}user`);
  return;
};

export { signUp, signIn, checkAut };
