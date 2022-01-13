import React from "react";
import styled from "styled-components";


interface ModalButtonContentProps {
    actionName: string;
    onClose : () => void;
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


const ModalButtonContent = ({ actionName ,onClose} : ModalButtonContentProps) => {
    return (
        <ModalButtonContentContainer>
            <button>{actionName}</button>
            <button onClick={onClose}>취소</button>
        </ModalButtonContentContainer>
    );
};

export default ModalButtonContent;