import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../../app/hooks";
import { closeModal } from "../../../../app/ducks/direct/DirectSlice";


interface ModalButtonContentProps {
    actionName: string;
}

const ModalButtonContentContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  button:first-child{
    color: #ed4956;
    font-weight: 700;
  }
  button{
    min-height: 48px;
    border-top: 1px solid rgba(var(--b6a,219,219,219),1);
    font-weight: 400;
  }
`;


const ModalButtonContent = ({ actionName} : ModalButtonContentProps) => {

    const dispatch = useAppDispatch();

    return (
        <ModalButtonContentContainer>
            <button>{actionName}</button>
            <button onClick={()=>{
                dispatch(closeModal())
            }}>취소</button>
        </ModalButtonContentContainer>
    );
};

export default ModalButtonContent;