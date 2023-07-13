import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { checkAut } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/modules/currentuser";

function Authorization() {
  const token = document.cookie.split("=")[1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutation = useMutation(checkAut, {
    onSuccess: (res) => {
      console.log("성공했을때", res);
      if (res === "nonetoken") {
        // 토큰 없을 때
        console.log("토큰없음");
        // currentUser 초기화
        dispatch(logoutUser());
      }
      if (res === "falsify") {
        console.log("위조 되었거나 토큰이 처음에 없을 때");
        // currentUser 초기화
        dispatch(logoutUser());
      }
      if (res === "expire") {
        console.log("토큰 만료");
        alert("토큰이 만료되었습니다! 다시 로그인해주세요");
        navigate("/signin");
      }
    },
    onError: (error) => {
      console.log("autError", error);
    },
  });

  useEffect(() => {
    mutation.mutate(token);
  }, []);

  return <></>;
}

export default Authorization;