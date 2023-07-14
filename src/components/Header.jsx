import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { IoHomeSharp } from "react-icons/io5";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/modules/currentuser";

function Header() {
  const navigate = useNavigate();
  const token = document.cookie.split("=")[1];
  const currentUser = useSelector((item) => item.currentuser);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    document.cookie = "token=; expires=-1;";
    dispatch(logoutUser());
    setIsLogin(currentUser.isLogin);
    alert("로그아웃 되었습니다!");
  };

  useEffect(() => {
    if (token.trim()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [currentUser]);

  return (
    <>
      <HeaderArea>
        <HeaderNav>
          <Button role="move" url={"/"} styleType={"icon"}>
            <IoHomeSharp size="30" />
          </Button>
          <div>
            {!isLogin && (
              <Button onClick={() => navigate("/signin")}>LogIn</Button>
            )}
            {isLogin && <Button onClick={() => logoutHandler()}>Logout</Button>}
          </div>
        </HeaderNav>
        <HeaderMainArea>
          <h1>스터디</h1>
        </HeaderMainArea>
      </HeaderArea>
    </>
  );
}

export default React.memo(Header);

const HeaderArea = styled.div`
  margin: 0 auto;
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const HeaderMainArea = styled.div`
  height: 120px;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: white;
  h1 {
    background-color: white;
  }
`;
