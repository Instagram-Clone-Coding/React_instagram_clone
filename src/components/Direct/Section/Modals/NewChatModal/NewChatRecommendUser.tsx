import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Circle } from "assets/Svgs/circle.svg";
import { ReactComponent as CheckedCircle } from "assets/Svgs/checkedCircle.svg";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
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

interface NewChatRecommendUserProps extends Direct.ChatItem {
    opponent: Direct.memberProps
}

const NewChatRecommendUser = ({ roomId, members,opponent }: NewChatRecommendUserProps) => {
    const { selectedNewChatUser } = useAppSelector(state => state.direct);
    const dispatch = useAppDispatch();

    const selectNewChatUserHandler = () => {

        if (!selectedNewChatUser) {
            dispatch(selectNewChatUser(opponent.username));
        }else if(selectedNewChatUser === opponent.username){
            dispatch(unSelectNewChatUser())
        }else {
            dispatch(selectNewChatUser(opponent.username))
        }
    };
    return (
        <NewChatRecommendUserContainer onClick={selectNewChatUserHandler}>
            <div className="user-info">
                <img src={opponent.imageUrl} alt="avatarImg" className="user-image" />
                <div className="user-name-container">
                <span className="user-memberUsername">
                    {opponent.username}
                </span>
                    <span className="user-memberName">
                    {opponent.name}
                </span>
                </div>
            </div>
            <div className="circle-svg">
                {
                    selectedNewChatUser === opponent.username ? <CheckedCircle /> : <Circle />
                }
            </div>
        </NewChatRecommendUserContainer>
    );
};

export default NewChatRecommendUser;