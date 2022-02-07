import React from "react";
import styled from "styled-components";


interface ModalTitleContentProps {
    title: string;
    description?: string;
}

const ModalTitleContentContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 0 40px;
  margin-bottom: 30px;
  
  h3{
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }
  
  div{
    padding-top: 1rem;
    color: #8e8e8e;
  }
`;
const ModalTitleContent = ({ title, description }: ModalTitleContentProps) => {
    return (
            <ModalTitleContentContainer>
                <h3>{title}</h3>
                <div>{description}</div>
            </ModalTitleContentContainer>
    );
};

export default ModalTitleContent;