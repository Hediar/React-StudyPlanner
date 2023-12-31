import { styled } from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { updateComplete, updateStudy } from "../api/studyTodo";

const Button = (props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // 완료/미완료 변경
  const updateCompleteMutation = useMutation(updateComplete, {
    onSuccess: () => {
      queryClient.invalidateQueries("study");
    },
  });

  // 게시글 업데이트
  const updateDetailMutation = useMutation(updateStudy, {
    onSuccess: () => {
      queryClient.invalidateQueries("study");
      queryClient.invalidateQueries(`${props.update.id}`);
    },
  });

  const IconbuttonHandler = (role) => {
    if (role === "move") {
      navigate(`${props.url}`);
    } else {
      return;
    }
  };

  const basicButtonHandler = (role) => {
    switch (role) {
      case "complete": {
        const newComplete = { id: props.cardKey, isDone: !props.complete };
        updateCompleteMutation.mutate(newComplete);
        break;
      }
      case "update": {
        updateDetailMutation.mutate(props.update);
        break;
      }
      default:
        break;
    }
  };

  if (props.styleType === "icon") {
    return (
      <ButtonIconStyle onClick={(event) => IconbuttonHandler(props.role)}>
        {props.children}
      </ButtonIconStyle>
    );
  }

  return (
    <ButtonStyle
      onClick={() => {
        basicButtonHandler(props.role);
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      {props.children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  background-color: #172b4d;
  color: white;
  height: 30px;
  width: 75px;
  margin: 6px;

  &:active {
    background-color: #234072;
  }
`;

const ButtonIconStyle = styled.button`
  cursor: pointer;
  border: none;
  background-color: #d8e6e7;
`;
