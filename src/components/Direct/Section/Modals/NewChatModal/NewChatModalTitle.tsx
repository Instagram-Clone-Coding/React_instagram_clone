import React from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "assets/Svgs/close.svg";
import { closeModal } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch, useAppSelector } from "app/store/hooks";


interface NewChatModalTitleContainerType {
    isSelected:boolean
}


const NewChatModalTitleContainer = styled.div<NewChatModalTitleContainerType>`
  margin-top: -30px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  svg{
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


    const dispatch = useAppDispatch()
    const { selectedNewChatUser } = useAppSelector(state => state.direct);

    return (
        <NewChatModalTitleContainer isSelected={selectedNewChatUser !== null}>
            <Close onClick={()=>{
                dispatch(closeModal())
            }} />
            <h1>새로운 메시지</h1>
            <button>다음</button>
        </NewChatModalTitleContainer>
    );
};

export default NewChatModalTitle;