import React from "react";
import styled from "styled-components";

const NewChatSearchBarContainer = styled.div`


  padding: 10px 20px;

  border-bottom: 1px solid #dbdbdb;
  h4 {
    font-size: 1rem;
    font-weight: 600;
    
  }

  input {
    background: 0 0;
    border: none;
    color: rgba(var(--i1d, 38, 38, 38), 1);
    flex-grow: 1;
    font-size: 14px;
    line-height: 30px;
    overflow: visible;
    padding: 4px 12px;
  }
`;


const NewChatSearchBar = () => {
    return (
        <NewChatSearchBarContainer>
            <h4>
                받는 사람:
            </h4>
            <input type="text" placeholder={"검색..."} />
        </NewChatSearchBarContainer>
    );
};

export default NewChatSearchBar;