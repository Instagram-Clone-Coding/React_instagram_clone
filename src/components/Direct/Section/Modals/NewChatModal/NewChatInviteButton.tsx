import React from "react";
import styled from "styled-components";
import { useAppSelector } from "app/store/Hooks";
import CloseSVG from "assets/Svgs/CloseSVG";


const NewChatInviteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #e0f1ff;
  border-radius: 4px;

  button {
    color: #0095F6;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
  }

  & > button {
    margin-right: 5px;
  }

`;

const NewChatInviteButton = () => {

    const { selectedNewChatUser } = useAppSelector(state => state.direct);


    return (
        <NewChatInviteButtonContainer>
            <button>{selectedNewChatUser}</button>
            <button>
                <CloseSVG color={"#0095f6"} size={"12"} />
            </button>
        </NewChatInviteButtonContainer>
    );
};

export default NewChatInviteButton;