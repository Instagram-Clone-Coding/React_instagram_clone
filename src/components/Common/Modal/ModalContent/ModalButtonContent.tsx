import React from "react";
import styled from "styled-components";
import { closeModal, selectView } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import axios from "axios";
import { deleteRoom } from "../../../../app/store/ducks/direct/DirectThunk";

const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzgwMzIwNH0.pftOV8QO0D9gEhIyJMtdQ13u-eUHzDKR4qmLOITb44Y-YERm_OyInkovsCrw4YgnSVfNAlP52uC8Y1bfIpXgOA",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzgwMzIwNH0.pftOV8QO0D9gEhIyJMtdQ13u-eUHzDKR4qmLOITb44Y-YERm_OyInkovsCrw4YgnSVfNAlP52uC8Y1bfIpXgOA",
};


interface ModalButtonContentProps {
    actionName: string;
}

const ModalButtonContentContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  button:first-child {
    color: #ed4956;
    font-weight: 700;
  }

  button {
    min-height: 48px;
    border-top: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    font-weight: 400;
  }
`;


const ModalButtonContent = ({ actionName }: ModalButtonContentProps) => {

    const dispatch = useAppDispatch();
    const { selectedRoom } = useAppSelector(state => state.direct);

    const deleteRoomHandler = async () => {

        if (selectedRoom) {
            try {
                await dispatch(
                    deleteRoom({
                        token: token.accessToken,
                        roomId: selectedRoom.chatRoomId,
                    }),
                );
            } catch (error) {
                console.log(error);
            }
        }

    };

    const buttonRender = () => {
        switch (actionName) {
            case "삭제":
                return <button onClick={deleteRoomHandler}>{actionName}</button>;
            case "차단":
                return <button >{actionName}</button>;
            case "모두 삭제":
                return <button >{actionName}</button>;
        }
    };

    return (
        <ModalButtonContentContainer>
            {buttonRender()}
            <button onClick={() => {
                dispatch(closeModal());
            }}>취소
            </button>
        </ModalButtonContentContainer>
    );
};

export default ModalButtonContent;