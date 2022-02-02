import React from "react";
import styled from "styled-components";
import { closeModal, selectView } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import Loading from "components/Common/Loading";
import { makeRoom } from "app/store/ducks/direct/DirectThunk";
import CloseSVG from "assets/Svgs/CloseSVG";
const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0Mzc5NzA5Nn0.UCcHozBqGQoMzBvjWqeCuB9A71Kd0JvANWyh-SOV41joWynQAZwpGOh9aZ7CnMAwRlAPcNtMpndSMtNkBQfrug",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0Mzc5NzA5Nn0.UCcHozBqGQoMzBvjWqeCuB9A71Kd0JvANWyh-SOV41joWynQAZwpGOh9aZ7CnMAwRlAPcNtMpndSMtNkBQfrug",
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


    const makeRoomHandler = async () => {
        if (selectedNewChatUser) {
            await dispatch(makeRoom({ token: token.accessToken, username: selectedNewChatUser }));
            dispatch(closeModal())
            dispatch(selectView("chat"))
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