import React from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "assets/Svgs/close.svg";
import { closeModal } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import Loading from "components/Common/Loading";
import { makeRoom } from "app/store/ducks/direct/DirectThunk";

const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0Mjc3MzA0MH0.jqP4Dxxz2km0y1UloLINEH1nUP3iWau0YsU6gwBCHBMlGQ0BrDlGz9rJNPRvbgR51yuWasFfM5nwbr2lDGcnoQ",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjQyNzQxNDY4fQ.8mHe22G6uu6F_HB-5G8A7voUNLb5oRAuX84xlKWFUZeccsi_Y3DHMh1fC7w3uEG3UATvNc5U9PBPvF6hW1vpZw",
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
            <Close onClick={() => {
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