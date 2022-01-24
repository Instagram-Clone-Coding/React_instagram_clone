import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Circle } from "assets/Svgs/circle.svg";
import { ReactComponent as CheckedCircle } from "assets/Svgs/checkedCircle.svg";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { selectNewChatUser, unSelectNewChatUser } from "app/store/ducks/direct/DirectSlice";

const NewChatRecommendUserContainer = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .user-info {
    display: flex;

    .user-image {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .user-name-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .user-memberUsername {
        font-weight: 600;
      }

      .user-memberName {
        color: #8e8e8e;
      }
    }
  }


`;


const NewChatRecommendUser = ({ id, avatarImg, memberUsername, memberName }: Direct.ChatItem) => {
    const { selectedNewChatUser } = useAppSelector(state => state.direct);
    const dispatch = useAppDispatch();

    const selectNewChatUserHandler = () => {

        if (!selectedNewChatUser) {
            dispatch(selectNewChatUser(memberUsername));
        }else if(selectedNewChatUser === memberUsername){
            dispatch(unSelectNewChatUser())
        }else {
            dispatch(selectNewChatUser(memberUsername))
        }
    };
    return (
        <NewChatRecommendUserContainer onClick={selectNewChatUserHandler}>
            <div className="user-info">
                <img src={avatarImg} alt="avatarImg" className="user-image" />
                <div className="user-name-container">
                <span className="user-memberUsername">
                    {memberUsername}
                </span>
                    <span className="user-memberName">
                    {memberName}
                </span>
                </div>
            </div>
            <div className="circle-svg">
                {
                    selectedNewChatUser === memberUsername ? <CheckedCircle /> : <Circle />
                }
            </div>
        </NewChatRecommendUserContainer>
    );
};

export default NewChatRecommendUser;