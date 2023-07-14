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
      if (res === "nonetoken") {
        // 토큰 없을 때

        // currentUser 초기화
        dispatch(logoutUser());
      }
      if (res === "falsify") {
        // 위조/처음에 토큰 없을 때
        // currentUser 초기화
        dispatch(logoutUser());
      }
      if (res === "expire") {
        alert("토큰이 만료되었습니다! 다시 로그인해주세요");
        navigate("/signin");
      }
    },
    onError: (error) => {
      return error;
    },
  });

  const preventSign = () => {
    if (token) {
      alert("로그아웃 해주세요!");
      navigate("/");
    }
  };

  useEffect(() => {
    const currentUrl = window.location.href.split("/");
    const url = currentUrl[currentUrl.length - 1];
    if (url === "signin" || url === "signup") {
      preventSign();
    } else {
      if (!token) {
        navigate("/signin");
      }
    }

    mutation.mutate(token);
  }, [token]);

  return <></>;
}

export default Authorization;
