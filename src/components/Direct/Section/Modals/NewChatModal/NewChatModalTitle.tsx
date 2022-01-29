import React from "react";
import styled from "styled-components";
import { closeModal } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import Loading from "components/Common/Loading";
import { makeRoom } from "app/store/ducks/direct/DirectThunk";
import CloseSVG from "assets/Svgs/CloseSVG";

const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzQ2MzUwMn0.rh9_oBk6GQpeGWdz8tPg8U6cSXL6VJMCEXW8b-Y3hw7faPZn7qFtSXWjvmQPZ3718O82Fh8TyxlT-4JZ3bj8pg",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzQ2MzUwMn0.rh9_oBk6GQpeGWdz8tPg8U6cSXL6VJMCEXW8b-Y3hw7faPZn7qFtSXWjvmQPZ3718O82Fh8TyxlT-4JZ3bj8pg",
};

interface NewChatModalTitleContainerType {
    isSelected: boolean;
}


const NewChatModalTitleContainer = styled.div<NewChatModalTitleContainerType>`
  margin-top: -30px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;

  svg {
    cursor: pointer;
  }

  h1 {
    font-size: 1rem;
    font-weight: 600;
  }

  button {
    color: #0095f6;
    opacity: ${props => props.isSelected ? 1.0 : 0.2};
  }
`;

const NewChatModalTitle = () => {


    const dispatch = useAppDispatch();
    const { selectedNewChatUser, isLoading } = useAppSelector(state => state.direct);


    const makeRoomHandler = () => {
        if (selectedNewChatUser) {
            dispatch(makeRoom({ token: token.accessToken, username: selectedNewChatUser }));
        }
    };

    return (
        <NewChatModalTitleContainer isSelected={selectedNewChatUser !== null}>
            <CloseSVG color={"#262626"} size={"18"} onClick={() => {
                dispatch(closeModal());
            }} />
            <h1>새로운 메시지</h1>
            {
                isLoading ? <Loading size={18} /> : <button onClick={makeRoomHandler}
                >다음</button>
            }
        </NewChatModalTitleContainer>
    );
};

export default NewChatModalTitle;