import { changeSearchUser } from "app/store/ducks/common/commonSlice";
import {
    selectNewChatUser,
    unSelectNewChatUser,
} from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { ReactComponent as CheckedCircle } from "assets/Svgs/checkedCircle.svg";
import { ReactComponent as Circle } from "assets/Svgs/circle.svg";
import React from "react";
import styled from "styled-components";

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

const NewChatRecommendUser = ({ member }: CommonType.searchResultType) => {
    const { selectedNewChatUsers } = useAppSelector((state) => state.direct);
    const dispatch = useAppDispatch();
    if (!member) return null;

    const selectNewChatUserHandler = () => {
        // 이미 선택했다면 제거해줍니다.
        if (selectedNewChatUsers.includes(member?.username)) {
            dispatch(unSelectNewChatUser(member?.username));
        } else {
            dispatch(selectNewChatUser(member?.username));
            dispatch(changeSearchUser(""));
        }
    };
    return (
        <NewChatRecommendUserContainer onClick={selectNewChatUserHandler}>
            <div className="user-info">
                <img
                    src={member.image.imageUrl}
                    alt="avatarImg"
                    className="user-image"
                />
                <div className="user-name-container">
                    <span className="user-memberUsername">
                        {member.username}
                    </span>
                    <span className="user-memberName">{member.name}</span>
                </div>
            </div>
            <div className="circle-svg">
                {selectedNewChatUsers.includes(member.username) ? (
                    <CheckedCircle />
                ) : (
                    <Circle />
                )}
            </div>
        </NewChatRecommendUserContainer>
    );
};

export default NewChatRecommendUser;
